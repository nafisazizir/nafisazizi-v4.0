// src/types/content.ts

export interface BasePost {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string | null;
  blurDataURL: string | null;
  status: string;
  tags: string[];
  publishedDate: string | null;
  createdDate: string;
  editedDate: string | null;
}

export interface BasePostWithContent extends BasePost {
  content: string;
}

export interface BasePostPreview extends BasePost {
  excerpt?: string;
}

export type ContentType = 'blog' | 'project';

export interface ContentConfig {
  contentType: ContentType;
  basePath: string;
  singular: string; // 'post' or 'project'
  plural: string; // 'posts' or 'projects'
}
