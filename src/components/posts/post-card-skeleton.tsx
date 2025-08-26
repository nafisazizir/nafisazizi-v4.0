// src/components/posts/post-card-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

interface PostCardSkeletonProps {
  className?: string;
  delay?: number;
}

export function PostCardSkeleton({ className, delay = 0 }: PostCardSkeletonProps) {
  return (
    <article className={cn('group', className)}>
      <div className="space-y-4">
        {/* Cover Image Skeleton */}
        <Skeleton className="aspect-video w-full rounded-lg" delay={delay} />

        {/* Content */}
        <div className="space-y-2">
          {/* Date and Tags */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" delay={delay + 50} />
            <span className="text-muted-foreground">•</span>
            <Skeleton className="h-5 w-16" delay={delay + 100} />
            <Skeleton className="h-5 w-20" delay={delay + 150} />
          </div>

          {/* Title */}
          <Skeleton className="h-6 w-4/5" delay={delay + 200} />

          {/* Description */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" delay={delay + 250} />
            <Skeleton className="h-4 w-full" delay={delay + 300} />
            <Skeleton className="h-4 w-3/4" delay={delay + 350} />
          </div>

          {/* Read More */}
          <div className="pt-2">
            <Skeleton className="h-4 w-20" delay={delay + 400} />
          </div>
        </div>
      </div>
    </article>
  );
}
