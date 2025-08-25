// src/lib/notion/project-types.ts
import {  BasePostPreview, BasePostWithContent } from '@/types/content';

export type Project = BasePostWithContent

export type ProjectPreview = BasePostPreview

// Keep the original interfaces for backward compatibility if needed later
export interface LegacyProject {
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

export interface LegacyProjectPreview extends Omit<LegacyProject, 'content'> {
  excerpt?: string;
}
