// src/lib/notion/blog.ts
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { BLOG_DATABASE_ID, n2m, notion } from './client';
import type { BlogPost, BlogPostPreview } from './types';
import {
  createSlugFromTitle,
  extractExcerpt,
  getDateContent,
  getFormulaContent,
  getMultiSelectContent,
  getRichTextContent,
  getSelectContent,
  isFullPage,
  normalizeContent,
} from './utils';

function parseNotionPageToBlogPost(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page: any,
): Omit<BlogPost, 'content' | 'coverImage' | 'blurDataURL'> {
  const properties = page.properties;

  // Extract data from Notion properties
  const title = getRichTextContent(properties.Title?.title || properties.Name?.title || []);
  const description = getRichTextContent(
    properties.Description?.rich_text || properties['One Liner']?.rich_text || [],
  );
  const status = getSelectContent(properties.Status?.status);
  const tags = getMultiSelectContent(properties.Tags?.multi_select || []);
  const publishedDate = getDateContent(
    properties.Published?.date || properties['Published Date']?.date,
  );

  // Handle slug - try formula first, then fallback to creating from title
  let slug = getFormulaContent(properties.Slug?.formula);
  if (!slug && title) {
    slug = createSlugFromTitle(title);
  }

  return {
    id: page.id,
    title,
    slug,
    description,
    status,
    tags,
    publishedDate,
    createdDate: page.created_time,
    editedDate: page.last_edited_time,
  };
}

function getCoverImageUrl(page: PageObjectResponse): string | null {
  if (!page.cover) return null;

  if (page.cover.type === 'external') {
    return page.cover.external?.url || null;
  }

  if (page.cover.type === 'file') {
    return page.cover.file?.url || null;
  }

  return null;
}

export async function getAllBlogPosts(): Promise<BlogPostPreview[]> {
  try {
    console.log('Fetching blog posts from Notion...');

    const response = await notion.databases.query({
      database_id: BLOG_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Status',
            status: {
              equals: 'Published',
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Published Date',
          direction: 'descending',
        },
        {
          property: 'Created Date',
          direction: 'descending',
        },
      ],
    });

    console.log(`Found ${response.results.length} published blog posts`);

    const posts: BlogPostPreview[] = await Promise.all(
      response.results.filter(isFullPage).map(async (page) => {
        const post = parseNotionPageToBlogPost(page);
        const coverImage = getCoverImageUrl(page);

        // Get a brief content preview for excerpt
        let excerpt = post.description;
        if (!excerpt) {
          try {
            const mdBlocks = await n2m.pageToMarkdown(page.id);
            const markdown = n2m.toMarkdownString(mdBlocks).parent;
            excerpt = extractExcerpt(markdown, 160);
          } catch (error) {
            console.warn(`Failed to generate excerpt for post ${post.id}:`, error);
            excerpt = '';
          }
        }

        return {
          ...post,
          coverImage,
          blurDataURL: null, // We'll implement blur data URL later if needed
          excerpt,
        };
      }),
    );

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log(`Fetching blog post with slug: ${slug}`);

    const response = await notion.databases.query({
      database_id: BLOG_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Status',
            status: {
              equals: 'Published',
            },
          },
          {
            or: [
              {
                property: 'Slug',
                formula: {
                  string: {
                    equals: slug,
                  },
                },
              },
              // Fallback: if no slug formula, we'll need to check against generated slug
              // This is a simplified approach - in practice you might want to store slugs
            ],
          },
        ],
      },
    });

    if (response.results.length === 0) {
      console.log(`No blog post found with slug: ${slug}`);
      return null;
    }

    const page = response.results[0];
    if (!isFullPage(page)) {
      throw new Error('Invalid page object from Notion API');
    }

    const post = parseNotionPageToBlogPost(page);
    const coverImage = getCoverImageUrl(page);

    // Get the full content
    console.log(`Fetching content for blog post: ${post.title}`);
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    let markdown = n2m.toMarkdownString(mdBlocks).parent;
    markdown = normalizeContent(markdown);

    return {
      ...post,
      content: markdown,
      coverImage,
      blurDataURL: null, // We'll implement blur data URL later if needed
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    throw new Error(`Failed to fetch blog post: ${slug}`);
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const response = await notion.databases.query({
      database_id: BLOG_DATABASE_ID,
      filter: {
        property: 'Status',
        status: {
          equals: 'Published',
        },
      },
      page_size: 100, // Adjust if you have more posts
    });

    return response.results
      .filter(isFullPage)
      .map((page) => {
        const post = parseNotionPageToBlogPost(page);
        return post.slug;
      })
      .filter(Boolean); // Remove any empty slugs
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}
