// src/lib/images/processor.ts
// Image processing utilities for optimizing and caching images

import { createHash } from 'crypto';
import { mkdir, writeFile, access } from 'fs/promises';
import { join, extname } from 'path';
import sharp from 'sharp';

export interface ProcessedImage {
  originalUrl: string;
  localPath: string;
  publicPath: string;
  width: number;
  height: number;
  format: string;
  size: number;
  blurDataURL: string;
}

export interface ImageProcessingOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
  generateBlur?: boolean;
}

const DEFAULT_OPTIONS: Required<ImageProcessingOptions> = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 85,
  format: 'webp',
  generateBlur: true,
};

export class ImageProcessor {
  private static cache = new Map<string, ProcessedImage>();
  private baseDir: string;
  private publicDir: string;

  constructor(category: string = 'blog') {
    this.baseDir = join(process.cwd(), 'public', `${category}-images`);
    this.publicDir = `/${category}-images`;
  }

  private async ensureDirectoryExists(dirPath: string) {
    try {
      await mkdir(dirPath, { recursive: true });
    } catch (error: any) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }

  private generateImageHash(url: string): string {
    return createHash('md5').update(url).digest('hex');
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  private async fetchImageBuffer(url: string): Promise<Buffer> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  private async generateBlurDataURL(buffer: Buffer): Promise<string> {
    const blurBuffer = await sharp(buffer)
      .resize(10, 10, { fit: 'cover' })
      .blur(1)
      .webp({ quality: 20 })
      .toBuffer();
    
    const base64 = blurBuffer.toString('base64');
    return `data:image/webp;base64,${base64}`;
  }

  async processImage(
    url: string, 
    options: ImageProcessingOptions = {}
  ): Promise<ProcessedImage> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const hash = this.generateImageHash(url);
    
    // Check cache first
    if (ImageProcessor.cache.has(hash)) {
      return ImageProcessor.cache.get(hash)!;
    }

    // Generate filename
    const originalExt = extname(new URL(url).pathname) || '.jpg';
    const filename = `${hash}.${opts.format}`;
    const localPath = join(this.baseDir, filename);
    const publicPath = `${this.publicDir}/${filename}`;

    // Check if file already exists
    if (await this.fileExists(localPath)) {
      try {
        // Get existing file metadata
        const metadata = await sharp(localPath).metadata();
        const stats = await sharp(localPath).stats();
        
        const result: ProcessedImage = {
          originalUrl: url,
          localPath,
          publicPath,
          width: metadata.width || 0,
          height: metadata.height || 0,
          format: metadata.format || opts.format,
          size: stats.size || 0,
          blurDataURL: opts.generateBlur ? await this.generateBlurDataURL(await sharp(localPath).toBuffer()) : '',
        };

        ImageProcessor.cache.set(hash, result);
        return result;
      } catch (error) {
        console.warn(`Failed to read existing image ${filename}, regenerating...`);
      }
    }

    try {
      // Ensure directory exists
      await this.ensureDirectoryExists(this.baseDir);

      // Fetch and process image
      console.log(`   📸 Processing image: ${url}`);
      const buffer = await this.fetchImageBuffer(url);
      
      let pipeline = sharp(buffer);

      // Get original metadata
      const metadata = await pipeline.metadata();
      
      // Resize if needed
      if (metadata.width && metadata.width > opts.maxWidth || 
          metadata.height && metadata.height > opts.maxHeight) {
        pipeline = pipeline.resize(opts.maxWidth, opts.maxHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      // Convert format and optimize
      switch (opts.format) {
        case 'webp':
          pipeline = pipeline.webp({ quality: opts.quality });
          break;
        case 'jpg':
          pipeline = pipeline.jpeg({ quality: opts.quality });
          break;
        case 'png':
          pipeline = pipeline.png({ quality: opts.quality });
          break;
      }

      // Process and save
      const processedBuffer = await pipeline.toBuffer();
      await writeFile(localPath, processedBuffer);

      // Get final metadata
      const finalMetadata = await sharp(processedBuffer).metadata();
      const stats = { size: processedBuffer.length };

      // Generate blur placeholder
      const blurDataURL = opts.generateBlur ? 
        await this.generateBlurDataURL(processedBuffer) : '';

      const result: ProcessedImage = {
        originalUrl: url,
        localPath,
        publicPath,
        width: finalMetadata.width || 0,
        height: finalMetadata.height || 0,
        format: finalMetadata.format || opts.format,
        size: stats.size,
        blurDataURL,
      };

      // Cache result
      ImageProcessor.cache.set(hash, result);
      
      console.log(`     ✅ Saved optimized image: ${filename} (${result.width}x${result.height}, ${Math.round(result.size / 1024)}KB)`);
      
      return result;

    } catch (error) {
      console.error(`     ❌ Failed to process image ${url}:`, error);
      
      // Return a fallback result that uses the original URL
      const fallback: ProcessedImage = {
        originalUrl: url,
        localPath: '',
        publicPath: url, // Use original URL as fallback
        width: 0,
        height: 0,
        format: 'unknown',
        size: 0,
        blurDataURL: '',
      };
      
      return fallback;
    }
  }

  async processMultipleImages(
    urls: string[], 
    options: ImageProcessingOptions = {}
  ): Promise<Map<string, ProcessedImage>> {
    const results = new Map<string, ProcessedImage>();
    
    for (const url of urls) {
      if (url && url.startsWith('http')) {
        try {
          const processed = await this.processImage(url, options);
          results.set(url, processed);
        } catch (error) {
          console.error(`Failed to process image ${url}:`, error);
        }
      }
    }
    
    return results;
  }

  static clearCache() {
    this.cache.clear();
  }
}

// Utility function to extract image URLs from markdown content
export function extractImageUrls(markdown: string): string[] {
  const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/g;
  const urls: string[] = [];
  let match;
  
  while ((match = imageRegex.exec(markdown)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

// Utility function to replace image URLs in markdown with local paths
export function replaceImageUrls(markdown: string, imageMap: Map<string, ProcessedImage>): string {
  let updatedMarkdown = markdown;
  
  imageMap.forEach((processed, originalUrl) => {
    // Only replace if we have a valid local path
    if (processed.publicPath && processed.publicPath !== originalUrl) {
      updatedMarkdown = updatedMarkdown.replaceAll(originalUrl, processed.publicPath);
    }
  });
  
  return updatedMarkdown;
}
