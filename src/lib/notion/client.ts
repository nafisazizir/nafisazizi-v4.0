// src/lib/notion/client.ts
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// Validate environment variables
if (!process.env.NOTION_TOKEN) {
  throw new Error('NOTION_TOKEN is required');
}

if (!process.env.NOTION_BLOG_DATABASE_ID) {
  throw new Error('NOTION_BLOG_DATABASE_ID is required');
}

if (!process.env.NOTION_PROJECTS_DATABASE_ID) {
  throw new Error('NOTION_PROJECTS_DATABASE_ID is required');
}

// Initialize Notion client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Initialize Notion to Markdown converter with custom transformers
export const n2m = new NotionToMarkdown({
  notionClient: notion,
});

// Custom transformer for images to preserve alt text/captions
n2m.setCustomTransformer('image', async (block) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { image } = block as any;
  let imageUrl = '';

  if (image.type === 'external') {
    imageUrl = image.external?.url || '';
  } else if (image.type === 'file') {
    imageUrl = image.file?.url || '';
  }

  // Get the caption from the image block
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const caption = image.caption ? image.caption.map((text: any) => text.plain_text).join('') : '';

  // Return markdown image with alt text as caption
  return `![${caption}](${imageUrl})`;
});

// Database IDs
export const BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID;
export const PROJECTS_DATABASE_ID = process.env.NOTION_PROJECTS_DATABASE_ID;
