// src/components/projects/project-card.tsx
import { PostCard } from '@/components/posts';

import { getContentConfig } from '@/lib/content-config';
import { ProjectPreview } from '@/lib/notion/project-types';

interface ProjectCardProps {
  post: ProjectPreview;
  className?: string;
}

export function ProjectCard({ post, className }: ProjectCardProps) {
  const config = getContentConfig('project');
  return <PostCard post={post} config={config} className={className} />;
}
