/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/content/projects.ts
// Static content service that reads from pre-generated project files
// Falls back to Notion API in development if files don't exist
import type { BasePostPreview, BasePostWithContent } from '@/types/content';
import { readFile } from 'fs/promises';
import { join } from 'path';

const CONTENT_DIR = join(process.cwd(), 'content', 'projects');
const isDevelopment = process.env.NODE_ENV === 'development';

export class ProjectContentService {
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
          console.warn(
            `⚠️  Project content file ${filename} not found, falling back to Notion API`,
          );
          throw new Error('FALLBACK_TO_NOTION');
        }
        throw new Error(
          `Project content not found: ${filename}. Run 'npm run generate:content' to generate content files.`,
        );
      }
      throw error;
    }
  }

  static async getAllProjects(): Promise<BasePostPreview[]> {
    try {
      return await this.readJsonFile<BasePostPreview[]>('index.json');
    } catch (error: any) {
      if (isDevelopment && error.message === 'FALLBACK_TO_NOTION') {
        const { getAllProjects: getNotionProjects } = await import('@/lib/notion/projects');
        return getNotionProjects();
      }
      throw error;
    }
  }

  static async getProjectBySlug(slug: string): Promise<BasePostWithContent | null> {
    try {
      return await this.readJsonFile<BasePostWithContent>(`${slug}.json`);
    } catch (error: any) {
      if (
        error.message.includes('Project content not found') ||
        error.message === 'FALLBACK_TO_NOTION'
      ) {
        if (isDevelopment && error.message === 'FALLBACK_TO_NOTION') {
          const { getProjectBySlug: getNotionProject } = await import('@/lib/notion/projects');
          return getNotionProject(slug);
        }
        return null;
      }
      throw error;
    }
  }

  static async getAllProjectSlugs(): Promise<string[]> {
    try {
      const metadata = await this.readJsonFile<{ slugs: string[] }>('metadata.json');
      return metadata.slugs;
    } catch (error: any) {
      if (isDevelopment && error.message === 'FALLBACK_TO_NOTION') {
        const { getAllProjectSlugs: getNotionSlugs } = await import('@/lib/notion/projects');
        return getNotionSlugs();
      }
      throw error;
    }
  }

  static async getProjectMetadata() {
    try {
      return await this.readJsonFile('metadata.json');
    } catch (error: any) {
      if (isDevelopment && error.message === 'FALLBACK_TO_NOTION') {
        // Return minimal metadata for development
        return {
          generatedAt: new Date().toISOString(),
          totalProjects: 0,
          detailedProjects: 0,
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
export const getAllProjects = () => ProjectContentService.getAllProjects();
export const getProjectBySlug = (slug: string) => ProjectContentService.getProjectBySlug(slug);
export const getAllProjectSlugs = () => ProjectContentService.getAllProjectSlugs();
