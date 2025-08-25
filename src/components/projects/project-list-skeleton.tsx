// src/components/projects/project-list-skeleton.tsx
import { PostListSkeleton } from '@/components/posts';

interface ProjectListSkeletonProps {
  cardCount?: number;
}

export function ProjectListSkeleton({ cardCount = 6 }: ProjectListSkeletonProps) {
  return <PostListSkeleton cardCount={cardCount} />;
}
