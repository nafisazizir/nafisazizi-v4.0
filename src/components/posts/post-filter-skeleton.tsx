// src/components/posts/post-filter-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export function PostFilterSkeleton() {
  return (
    <div className="flex items-center justify-end">
      <Skeleton className="h-8 w-16" />
    </div>
  );
}
