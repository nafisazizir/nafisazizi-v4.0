// src/components/posts/post-filter-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export function PostFilterSkeleton() {
  return (
    <div className="space-y-4">
      {/* Filter Title */}
      <Skeleton className="h-5 w-32" />

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-18" />
        <Skeleton className="h-8 w-22" />
      </div>
    </div>
  );
}
