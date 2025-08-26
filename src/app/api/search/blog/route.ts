import { NextRequest, NextResponse } from 'next/server';

import { getAllBlogPosts } from '@/lib/content';

export async function GET(request: NextRequest) {
  try {
    const posts = await getAllBlogPosts();

    // Return simplified data for search
    const searchData = posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
    }));

    return NextResponse.json(searchData);
  } catch (error) {
    console.error('Error fetching blog posts for search:', error);
    return NextResponse.json([]);
  }
}
