// src/components/projects/project-content.tsx
import { PostContent } from '@/components/posts';
import { Project } from '@/lib/notion/project-types';

interface ProjectContentProps {
  post: Project;
}

export function ProjectContent({ post }: ProjectContentProps) {
  return <PostContent post={post} />;
}
