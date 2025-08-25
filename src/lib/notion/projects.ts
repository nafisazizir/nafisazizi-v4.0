// src/lib/notion/projects.ts
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { PROJECTS_DATABASE_ID, n2m, notion } from './client';
import type { Project, ProjectPreview } from './project-types';
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

function parseNotionPageToProject(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page: any,
): Omit<Project, 'content' | 'coverImage' | 'blurDataURL'> {
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

export async function getAllProjects(): Promise<ProjectPreview[]> {
  try {
    console.log('Fetching projects from Notion...');

    const response = await notion.databases.query({
      database_id: PROJECTS_DATABASE_ID,
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

    console.log(`Found ${response.results.length} published projects`);

    const projects: ProjectPreview[] = await Promise.all(
      response.results.filter(isFullPage).map(async (page) => {
        const project = parseNotionPageToProject(page);
        const coverImage = getCoverImageUrl(page);

        // Get a brief content preview for excerpt
        let excerpt = project.description;
        if (!excerpt) {
          try {
            const mdBlocks = await n2m.pageToMarkdown(page.id);
            const markdown = n2m.toMarkdownString(mdBlocks).parent;
            excerpt = extractExcerpt(markdown, 160);
          } catch (error) {
            console.warn(`Failed to generate excerpt for project ${project.id}:`, error);
            excerpt = '';
          }
        }

        return {
          ...project,
          coverImage,
          blurDataURL: null, // We'll implement blur data URL later if needed
          excerpt,
        };
      }),
    );

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    console.log(`Fetching project with slug: ${slug}`);

    const response = await notion.databases.query({
      database_id: PROJECTS_DATABASE_ID,
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
      console.log(`No project found with slug: ${slug}`);
      return null;
    }

    const page = response.results[0];
    if (!isFullPage(page)) {
      throw new Error('Invalid page object from Notion API');
    }

    const project = parseNotionPageToProject(page);
    const coverImage = getCoverImageUrl(page);

    // Get the full content
    console.log(`Fetching content for project: ${project.title}`);
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    let markdown = n2m.toMarkdownString(mdBlocks).parent;
    markdown = normalizeContent(markdown);

    return {
      ...project,
      content: markdown,
      coverImage,
      blurDataURL: null, // We'll implement blur data URL later if needed
    };
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    throw new Error(`Failed to fetch project: ${slug}`);
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const response = await notion.databases.query({
      database_id: PROJECTS_DATABASE_ID,
      filter: {
        property: 'Status',
        status: {
          equals: 'Published',
        },
      },
      page_size: 100, // Adjust if you have more projects
    });

    return response.results
      .filter(isFullPage)
      .map((page) => {
        const project = parseNotionPageToProject(page);
        return project.slug;
      })
      .filter(Boolean); // Remove any empty slugs
  } catch (error) {
    console.error('Error fetching project slugs:', error);
    return [];
  }
}
