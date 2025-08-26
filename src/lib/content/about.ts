// src/lib/content/about.ts
// Static content service for About page
// Falls back to Notion API in development if file doesn't exist
import { readFile } from 'fs/promises';
import { join } from 'path';

import type { AboutPage } from '@/lib/notion/about';

const CONTENT_DIR = join(process.cwd(), 'content');
const isDevelopment = process.env.NODE_ENV === 'development';

export class AboutContentService {
  private static cache: AboutPage | null = null;

  static async getAboutPage(): Promise<AboutPage> {
    // Check cache first
    if (this.cache) {
      return this.cache;
    }

    try {
      const filePath = join(CONTENT_DIR, 'about.json');
      const content = await readFile(filePath, 'utf-8');
      const data = JSON.parse(content) as AboutPage;

      // Cache the data
      this.cache = data;
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        // In development, fall back to Notion API if content file doesn't exist
        if (isDevelopment) {
          console.warn('⚠️  About content file not found, falling back to Notion API');
          const { getAboutPageContent } = await import('@/lib/notion/about');
          const aboutData = await getAboutPageContent();

          // Cache the live data
          this.cache = aboutData;
          return aboutData;
        }
        throw new Error(
          "About content not found. Run 'npm run generate:content' to generate content files.",
        );
      }
      throw error;
    }
  }

  static clearCache() {
    this.cache = null;
  }
}

// Export function that matches the pattern
export const getAboutPage = () => AboutContentService.getAboutPage();
