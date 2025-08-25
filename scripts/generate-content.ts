#!/usr/bin/env tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
// scripts/generate-content.ts
// Pre-build script that fetches all content from Notion, processes images, and stores locally
import 'dotenv/config';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { ImageProcessor, extractImageUrls, replaceImageUrls } from '../src/lib/images/index.js';
import { getAboutPageContent } from '../src/lib/notion/about.js';
import { getAllBlogPosts, getAllBlogSlugs, getBlogPostBySlug } from '../src/lib/notion/index.js';
import {
  getAllProjectSlugs,
  getAllProjects,
  getProjectBySlug,
} from '../src/lib/notion/projects.js';

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

async function processPostImages<
  T extends {
    title: string;
    content: string;
    coverImage: string | null;
    blurDataURL: string | null;
  },
>(post: T, imageProcessor: ImageProcessor): Promise<T> {
  console.log(`     🖼️  Processing images for "${post.title}"...`);

  const imagesToProcess: string[] = [];

  // Add cover image if it exists
  if (post.coverImage && post.coverImage.startsWith('http')) {
    imagesToProcess.push(post.coverImage);
  }

  // Extract images from content
  const contentImages = extractImageUrls(post.content);
  imagesToProcess.push(...contentImages);

  if (imagesToProcess.length === 0) {
    console.log(`       No images to process`);
    return post;
  }

  console.log(`       Found ${imagesToProcess.length} images to optimize`);

  // Process all images
  const processedImages = await imageProcessor.processMultipleImages(imagesToProcess, {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 85,
    format: 'webp',
    generateBlur: true,
  });

  // Update cover image if processed
  let updatedCoverImage = post.coverImage;
  let coverBlurDataURL = post.blurDataURL;

  if (post.coverImage && processedImages.has(post.coverImage)) {
    const processed = processedImages.get(post.coverImage)!;
    updatedCoverImage = processed.publicPath;
    coverBlurDataURL = processed.blurDataURL;
  }

  // Update content with local image paths
  const updatedContent = replaceImageUrls(post.content, processedImages);

  console.log(`       ✅ Processed ${processedImages.size} images successfully`);

  return {
    ...post,
    coverImage: updatedCoverImage,
    blurDataURL: coverBlurDataURL,
    content: updatedContent,
  };
}

async function generateBlogContent() {
  console.log('🚀 Starting blog content generation with image optimization...\n');

  try {
    // Create content directory
    const contentDir = join(projectRoot, 'content', 'blog');
    await ensureDirectoryExists(contentDir);

    // Initialize image processor
    const imageProcessor = new ImageProcessor('blog');
    console.log('📸 Image processor initialized\n');

    console.log('📝 Fetching blog posts overview...');

    // Get all blog posts (preview data)
    const blogPosts = await getAllBlogPosts();
    console.log(`   Found ${blogPosts.length} published posts`);

    // Process images for preview posts (cover images only)
    const processedBlogPosts = [];
    for (let i = 0; i < blogPosts.length; i++) {
      const post = blogPosts[i];
      console.log(`   Processing preview ${i + 1}/${blogPosts.length}: ${post.title}`);

      const updatedPost = { ...post };

      // Process cover image if it exists
      if (post.coverImage && post.coverImage.startsWith('http')) {
        try {
          const processed = await imageProcessor.processImage(post.coverImage, {
            maxWidth: 800,
            maxHeight: 450,
            quality: 85,
            format: 'webp',
            generateBlur: true,
          });

          updatedPost.coverImage = processed.publicPath;
          updatedPost.blurDataURL = processed.blurDataURL;
        } catch (error) {
          console.warn(`     ⚠️  Failed to process cover image: ${error}`);
        }
      }

      processedBlogPosts.push(updatedPost);
    }

    // Save blog posts overview
    const blogOverviewPath = join(contentDir, 'index.json');
    await writeFile(blogOverviewPath, JSON.stringify(processedBlogPosts, null, 2));
    console.log(`   ✅ Saved blog overview with optimized images to ${blogOverviewPath}`);

    // Get all slugs for detailed content
    console.log('\n📄 Fetching detailed post content with full image processing...');
    const slugs = await getAllBlogSlugs();

    const detailedPosts = [];

    for (let i = 0; i < slugs.length; i++) {
      const slug = slugs[i];
      console.log(`   Processing ${i + 1}/${slugs.length}: ${slug}`);

      try {
        const post = await getBlogPostBySlug(slug);
        if (post) {
          // Process all images in the post
          const processedPost = await processPostImages(post, imageProcessor);
          detailedPosts.push(processedPost);

          // Save individual post file
          const postPath = join(contentDir, `${slug}.json`);
          await writeFile(postPath, JSON.stringify(processedPost, null, 2));
          console.log(`     ✅ Saved ${slug}.json with optimized images`);
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

    // Generate metadata file with image statistics
    const totalImages = ImageProcessor['cache']?.size || 0;
    const metadata = {
      generatedAt: new Date().toISOString(),
      totalPosts: processedBlogPosts.length,
      detailedPosts: detailedPosts.length,
      slugs: slugs,
      lastUpdated: new Date().toISOString(),
      imageStats: {
        totalImagesProcessed: totalImages,
        coverImagesOptimized: processedBlogPosts.filter(
          (p) => p.coverImage && !p.coverImage.startsWith('http'),
        ).length,
      },
    };

    const metadataPath = join(contentDir, 'metadata.json');
    await writeFile(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`   ✅ Saved metadata with image stats to metadata.json`);

    console.log('\n🎉 Blog content generation with image optimization completed successfully!');
    console.log(`📊 Generated ${detailedPosts.length} blog posts`);
    console.log(`🖼️  Optimized images`);
    console.log(`📁 Content saved to: ${contentDir}`);
    console.log(`🖼️  Images saved to: public/blog-images/`);

    return {
      totalPosts: processedBlogPosts.length,
      detailedPosts: detailedPosts.length,
      processedImages: totalImages,
    };
  } catch (error) {
    console.error('\n❌ Blog content generation failed:');
    console.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

async function generateProjectContent() {
  console.log('\n🚧 Generating project content with image optimization...\n');

  try {
    // Create content directory
    const contentDir = join(projectRoot, 'content', 'projects');
    await ensureDirectoryExists(contentDir);

    // Initialize image processor for projects
    const imageProcessor = new ImageProcessor('project');
    console.log('📸 Project image processor initialized\n');

    console.log('📝 Fetching project posts overview...');

    // Get all projects (preview data)
    const projects = await getAllProjects();
    console.log(`   Found ${projects.length} published projects`);

    // Process images for preview projects (cover images only)
    const processedProjects = [];
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      console.log(`   Processing preview ${i + 1}/${projects.length}: ${project.title}`);

      const updatedProject = { ...project };

      // Process cover image if it exists
      if (project.coverImage && project.coverImage.startsWith('http')) {
        try {
          const processed = await imageProcessor.processImage(project.coverImage, {
            maxWidth: 800,
            maxHeight: 450,
            quality: 85,
            format: 'webp',
            generateBlur: true,
          });

          updatedProject.coverImage = processed.publicPath;
          updatedProject.blurDataURL = processed.blurDataURL;
        } catch (error) {
          console.warn(`     ⚠️  Failed to process cover image: ${error}`);
        }
      }

      processedProjects.push(updatedProject);
    }

    // Save projects overview
    const projectOverviewPath = join(contentDir, 'index.json');
    await writeFile(projectOverviewPath, JSON.stringify(processedProjects, null, 2));
    console.log(`   ✅ Saved project overview with optimized images to ${projectOverviewPath}`);

    // Get all slugs for detailed content
    console.log('\n📄 Fetching detailed project content with full image processing...');
    const slugs = await getAllProjectSlugs();

    const detailedProjects = [];

    for (let i = 0; i < slugs.length; i++) {
      const slug = slugs[i];
      console.log(`   Processing ${i + 1}/${slugs.length}: ${slug}`);

      try {
        const project = await getProjectBySlug(slug);
        if (project) {
          // Process all images in the project
          const processedProject = await processPostImages(project, imageProcessor);
          detailedProjects.push(processedProject);

          // Save individual project file
          const projectPath = join(contentDir, `${slug}.json`);
          await writeFile(projectPath, JSON.stringify(processedProject, null, 2));
          console.log(`     ✅ Saved ${slug}.json with optimized images`);
        }
      } catch (error) {
        console.log(
          `     ❌ Failed to process ${slug}: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    }

    // Create a complete projects collection (all detailed projects)
    const allProjectsPath = join(contentDir, 'all-projects.json');
    await writeFile(allProjectsPath, JSON.stringify(detailedProjects, null, 2));
    console.log(`   ✅ Saved complete collection to all-projects.json`);

    // Generate metadata file with image statistics
    const totalImages = ImageProcessor['cache']?.size || 0;
    const metadata = {
      generatedAt: new Date().toISOString(),
      totalProjects: processedProjects.length,
      detailedProjects: detailedProjects.length,
      slugs: slugs,
      lastUpdated: new Date().toISOString(),
      imageStats: {
        totalImagesProcessed: totalImages,
        coverImagesOptimized: processedProjects.filter(
          (p) => p.coverImage && !p.coverImage.startsWith('http'),
        ).length,
      },
    };

    const metadataPath = join(contentDir, 'metadata.json');
    await writeFile(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`   ✅ Saved metadata with image stats to metadata.json`);

    console.log('\n🎉 Project content generation with image optimization completed successfully!');
    console.log(`📊 Generated ${detailedProjects.length} projects`);
    console.log(`🖼️  Optimized images`);
    console.log(`📁 Content saved to: ${contentDir}`);
    console.log(`🖼️  Images saved to: public/project-images/`);

    return {
      totalProjects: processedProjects.length,
      detailedProjects: detailedProjects.length,
      processedImages: totalImages,
    };
  } catch (error) {
    console.error('\n❌ Project content generation failed:');
    console.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

async function generateAboutContent() {
  console.log('\n👤 Generating About page content...\n');

  try {
    // Create content directory (root content folder)
    const contentDir = join(projectRoot, 'content');
    await ensureDirectoryExists(contentDir);

    console.log('📝 Fetching About page content...');

    // Get the about page content
    const aboutPage = await getAboutPageContent();
    console.log(`   ✅ Successfully fetched About page: "${aboutPage.title}"`);

    // Save about page content directly (no image processing needed)
    const aboutPath = join(contentDir, 'about.json');
    await writeFile(aboutPath, JSON.stringify(aboutPage, null, 2));
    console.log(`   ✅ Saved about page to ${aboutPath}`);

    console.log('\n🎉 About page content generation completed successfully!');
    console.log(`📊 Generated About page`);
    console.log(`📁 Content saved to: ${aboutPath}`);

    return {
      processedImages: 0, // No image processing for About page
    };
  } catch (error) {
    console.error('\n❌ About page content generation failed:');
    console.error(error instanceof Error ? error.message : String(error));
    throw error;
  }
}

// Run the content generation
async function generateAllContent() {
  console.log('🚀 Starting complete content generation with image optimization...\n');

  try {
    const blogStats = await generateBlogContent();
    const projectStats = await generateProjectContent();
    const aboutStats = await generateAboutContent();

    console.log('\n🎆 All content generation completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   📝 Blog: ${blogStats.detailedPosts} posts generated`);
    console.log(`   💡 Projects: ${projectStats.detailedProjects} projects generated`);
    console.log(`   👤 About: 1 page generated (no images)`);
    console.log(
      `   🖼️  Total images optimized: ${
        blogStats.processedImages + projectStats.processedImages
      } (blog + projects only)`,
    );
  } catch (error) {
    console.error('\n❌ Complete content generation failed:');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

generateAllContent();
