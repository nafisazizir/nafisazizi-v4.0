#!/usr/bin/env tsx
// scripts/generate-content.ts
// Pre-build script that fetches all content from Notion and stores it locally
import 'dotenv/config';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { getAllBlogPosts, getAllBlogSlugs, getBlogPostBySlug } from '../src/lib/notion/index.js';

// Get the directory of this script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function ensureDirectoryExists(dirPath: string) {
  try {
    await mkdir(dirPath, { recursive: true });
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function generateBlogContent() {
  console.log('🚀 Starting content generation...\n');

  try {
    // Create content directory
    const contentDir = join(projectRoot, 'content', 'blog');
    await ensureDirectoryExists(contentDir);

    console.log('📝 Fetching blog posts overview...');

    // Get all blog posts (preview data)
    const blogPosts = await getAllBlogPosts();
    console.log(`   Found ${blogPosts.length} published posts`);

    // Save blog posts overview
    const blogOverviewPath = join(contentDir, 'index.json');
    await writeFile(blogOverviewPath, JSON.stringify(blogPosts, null, 2));
    console.log(`   ✅ Saved blog overview to ${blogOverviewPath}`);

    // Get all slugs for detailed content
    console.log('\n📄 Fetching detailed post content...');
    const slugs = await getAllBlogSlugs();

    const detailedPosts = [];

    for (let i = 0; i < slugs.length; i++) {
      const slug = slugs[i];
      console.log(`   Processing ${i + 1}/${slugs.length}: ${slug}`);

      try {
        const post = await getBlogPostBySlug(slug);
        if (post) {
          detailedPosts.push(post);

          // Save individual post file
          const postPath = join(contentDir, `${slug}.json`);
          await writeFile(postPath, JSON.stringify(post, null, 2));
          console.log(`     ✅ Saved ${slug}.json`);
        }
      } catch (error) {
        console.log(
          `     ❌ Failed to process ${slug}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    // Create a complete posts collection (all detailed posts)
    const allPostsPath = join(contentDir, 'all-posts.json');
    await writeFile(allPostsPath, JSON.stringify(detailedPosts, null, 2));
    console.log(`   ✅ Saved complete collection to all-posts.json`);

    // Generate metadata file
    const metadata = {
      generatedAt: new Date().toISOString(),
      totalPosts: blogPosts.length,
      detailedPosts: detailedPosts.length,
      slugs: slugs,
      lastUpdated: new Date().toISOString(),
    };

    const metadataPath = join(contentDir, 'metadata.json');
    await writeFile(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`   ✅ Saved metadata to metadata.json`);

    console.log('\n🎉 Content generation completed successfully!');
    console.log(`📊 Generated ${detailedPosts.length} blog posts`);
    console.log(`📁 Content saved to: ${contentDir}`);
  } catch (error) {
    console.error('\n❌ Content generation failed:');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Run the content generation
generateBlogContent();
