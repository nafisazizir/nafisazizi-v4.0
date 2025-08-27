import { NextRequest, NextResponse } from 'next/server';

import { getAllProjects } from '@/lib/content';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const projects = await getAllProjects();

    // Return simplified data for search
    const searchData = projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      description: project.description,
    }));

    return NextResponse.json(searchData);
  } catch (error) {
    console.error('Error fetching projects for search:', error);
    return NextResponse.json([]);
  }
}
