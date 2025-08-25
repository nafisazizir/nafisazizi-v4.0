// src/lib/notion/about.ts
import { n2m, notion } from './client';
import { isFullPage, normalizeContent } from './utils';

const ABOUT_PAGE_ID = '25a19bd29bd58095be5cd14370c3a7ce';

export interface AboutPage {
  id: string;
  title: string;
  content: string;
  coverImage: string | null;
  lastEdited: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCoverImageUrl(page: any): string | null {
  if (!page.cover) return null;

  if (page.cover.type === 'external') {
    return page.cover.external?.url || null;
  }

  if (page.cover.type === 'file') {
    return page.cover.file?.url || null;
  }

  return null;
}

export async function getAboutPageContent(): Promise<AboutPage> {
  try {
    console.log('Fetching About page from Notion...');

    // Get the page data
    const page = await notion.pages.retrieve({ page_id: ABOUT_PAGE_ID });

    if (!isFullPage(page)) {
      throw new Error('Invalid page object from Notion API');
    }

    // Extract basic info
    const title = 'About Me'; // Default title, or extract from properties if needed
    const coverImage = getCoverImageUrl(page);
    const lastEdited = page.last_edited_time;

    // Get the content as Markdown
    console.log('Converting page content to Markdown...');
    const mdBlocks = await n2m.pageToMarkdown(ABOUT_PAGE_ID);
    let markdown = n2m.toMarkdownString(mdBlocks).parent;
    markdown = normalizeContent(markdown);

    console.log('Successfully fetched About page content');

    return {
      id: page.id,
      title,
      content: markdown,
      coverImage,
      lastEdited,
    };
  } catch (error) {
    console.error('Error fetching About page:', error);
    throw new Error('Failed to fetch About page content');
  }
}
