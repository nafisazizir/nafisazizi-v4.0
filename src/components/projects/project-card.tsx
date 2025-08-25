// src/components/projects/project-card.tsx
import { PostCard } from '@/components/posts';
import { ProjectPreview } from '@/lib/notion/project-types';
import { getContentConfig } from '@/lib/content-config';

interface ProjectCardProps {
  post: ProjectPreview;
  className?: string;
}

export function ProjectCard({ post, className }: ProjectCardProps) {
  const config = getContentConfig('project');
  return <PostCard post={post} config={config} className={className} />;
}
