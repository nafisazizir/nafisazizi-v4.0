// src/components/projects/project-list.tsx
import { PostList } from '@/components/posts';
import { ProjectPreview } from '@/lib/notion/project-types';
import { getContentConfig } from '@/lib/content-config';

interface ProjectListProps {
  posts: ProjectPreview[];
}

export function ProjectList({ posts }: ProjectListProps) {
  const config = getContentConfig('project');
  return <PostList posts={posts} config={config} />;
}
