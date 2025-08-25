// src/components/blog/blog-list-skeleton.tsx
import { PostListSkeleton } from '@/components/posts';

interface BlogListSkeletonProps {
  cardCount?: number;
}

export function BlogListSkeleton({ cardCount = 6 }: BlogListSkeletonProps) {
  return <PostListSkeleton cardCount={cardCount} />;
}
