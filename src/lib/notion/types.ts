// src/lib/notion/types.ts
import { BasePostPreview, BasePostWithContent } from '@/types/content';

export type BlogPost = BasePostWithContent;

export type BlogPostPreview = BasePostPreview;

// Keep the original interfaces for backward compatibility
export interface LegacyBlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string | null;
  blurDataURL: string | null;
  status: string;
  tags: string[];
  publishedDate: string | null;
  createdDate: string;
  editedDate: string | null;
}

export interface LegacyBlogPostPreview extends Omit<LegacyBlogPost, 'content'> {
  excerpt?: string;
}

export interface NotionProperty {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface NotionPage {
  id: string;
  properties: Record<string, NotionProperty>;
  cover?: {
    type: 'external' | 'file';
    external?: { url: string };
    file?: { url: string };
  } | null;
  created_time: string;
  last_edited_time: string;
}
