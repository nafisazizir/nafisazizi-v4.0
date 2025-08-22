/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/content/blog.ts
// Static content service that reads from pre-generated files
// Falls back to Notion API in development if files don't exist
import { readFile } from 'fs/promises';
import { join } from 'path';

import type { BlogPost, BlogPostPreview } from '@/lib/notion/types';

const CONTENT_DIR = join(process.cwd(), 'content', 'blog');
const isDevelopment = process.env.NODE_ENV === 'development';

export class ContentService {
  private static cache = new Map<string, any>();

  private static async readJsonFile<T>(filename: string): Promise<T> {
    // Check cache first
    if (this.cache.has(filename)) {
      return this.cache.get(filename);
    }

    try {
      const filePath = join(CONTENT_DIR, filename);
      const content = await readFile(filePath, 'utf-8');
      const data = JSON.parse(content);

      // Cache the data
      this.cache.set(filename, data);
      return data;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        // In development, fall back to Notion API if content files don't exist
        if (isDevelopment) {
          console.warn(`⚠️  Content file ${filename} not found, falling back to Notion API`);
          throw new Error('FALLBACK_TO_NOTION');
        }
        throw new Error(
          `Content not found: ${filename}. Run 'npm run generate:content' to generate content files.`,
        );
      }
      throw error;
    }
  }

  static async getAllBlogPosts(): Promise<BlogPostPreview[]> {
    try {
      return await this.readJsonFile<BlogPostPreview[]>('index.json');
    } catch (error: any) {
      if (isDevelopment && error.message === 'FALLBACK_TO_NOTION') {
        const { getAllBlogPosts: getNotionPosts } = await import('@/lib/notion');
        return getNotionPosts();
      }
      throw error;
    }
  }

  static async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      return await this.readJsonFile<BlogPost>(`${slug}.json`);
    } catch (error: any) {
      if (error.message.includes('Content not found') || error.message === 'FALLBACK_TO_NOTION') {
        if (isDevelopment && error.message === 'FALLBACK_TO_NOTION') {
          const { getBlogPostBySlug: getNotionPost } = await import('@/lib/notion');
          return getNotionPost(slug);
        }
        return null;
      }
      throw error;
    }
  }

  static async getAllBlogSlugs(): Promise<string[]> {
    try {
      const metadata = await this.readJsonFile<{ slugs: string[] }>('metadata.json');
      return metadata.slugs;
    } catch (error: any) {
      if (isDevelopment && error.message === 'FALLBACK_TO_NOTION') {
        const { getAllBlogSlugs: getNotionSlugs } = await import('@/lib/notion');
        return getNotionSlugs();
      }
      throw error;
    }
  }

  static async getBlogMetadata() {
    try {
      return await this.readJsonFile('metadata.json');
    } catch (error: any) {
      if (isDevelopment && error.message === 'FALLBACK_TO_NOTION') {
        // Return minimal metadata for development
        return {
          generatedAt: new Date().toISOString(),
          totalPosts: 0,
          detailedPosts: 0,
          slugs: [],
          lastUpdated: new Date().toISOString(),
          fallbackMode: true,
        };
      }
      throw error;
    }
  }

  static clearCache() {
    this.cache.clear();
  }
}

// Export functions that match the Notion API interface
export const getAllBlogPosts = () => ContentService.getAllBlogPosts();
export const getBlogPostBySlug = (slug: string) => ContentService.getBlogPostBySlug(slug);
export const getAllBlogSlugs = () => ContentService.getAllBlogSlugs();
