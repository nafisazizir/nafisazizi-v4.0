// src/components/posts/post-list-skeleton.tsx
import { PostCardSkeleton } from './post-card-skeleton';
import { PostFilterSkeleton } from './post-filter-skeleton';

interface PostListSkeletonProps {
  cardCount?: number;
}

export function PostListSkeleton({ cardCount = 6 }: PostListSkeletonProps) {
  return (
    <div className="space-y-8">
      {/* Filter Section */}
      <PostFilterSkeleton />

      {/* Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cardCount }).map((_, index) => (
          <PostCardSkeleton key={index} delay={index * 100} />
        ))}
      </div>
    </div>
  );
}
