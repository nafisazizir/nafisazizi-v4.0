// src/components/posts/post-content-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export function PostContentSkeleton() {
  return (
    <article className="mx-auto">
      {/* Header */}
      <header className="mb-10 space-y-3">
        {/* Meta - Tags */}
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-18" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="mx-auto h-12 w-4/5" />
          <Skeleton className="mx-auto h-12 w-3/5" />
        </div>

        {/* Date */}
        <div className="flex justify-center">
          <Skeleton className="h-4 w-32" />
        </div>
      </header>

      {/* Cover Image */}
      <div className="mb-8">
        <Skeleton className="aspect-video w-full rounded-lg" />
      </div>

      {/* Content */}
      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
        {/* First paragraph */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Second paragraph */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Heading */}
        <div className="pt-2">
          <Skeleton className="h-8 w-2/3" />
        </div>

        {/* Paragraph after heading */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Code block or image placeholder */}
        <Skeleton className="h-40 w-full rounded-md" />

        {/* More content */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Another heading */}
        <div className="pt-2">
          <Skeleton className="h-7 w-1/2" />
        </div>

        {/* Final paragraphs */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>
    </article>
  );
}
