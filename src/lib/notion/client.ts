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

// Initialize Notion client
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Initialize Notion to Markdown converter
export const n2m = new NotionToMarkdown({ 
  notionClient: notion 
});

// Database IDs
export const BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID;
