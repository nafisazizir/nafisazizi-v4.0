// src/components/projects/project-list.tsx
import { PostList } from '@/components/posts';

import { getContentConfig } from '@/lib/content-config';
import { ProjectPreview } from '@/lib/notion/project-types';

interface ProjectListProps {
  posts: ProjectPreview[];
}

export function ProjectList({ posts }: ProjectListProps) {
  const config = getContentConfig('project');
  return <PostList posts={posts} config={config} />;
}
