// src/components/posts/post-card.tsx
import { BasePostPreview, ContentConfig } from '@/types/content';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface PostCardProps {
  post: BasePostPreview;
  config: ContentConfig;
  className?: string;
}

export function PostCard({ post, config, className }: PostCardProps) {
  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(post.createdDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return (
    <article className={cn('group', className)}>
      <Link href={`${config.basePath}/${post.slug}`} className="block">
        <div className="space-y-4">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={400}
                height={225}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                placeholder={post.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={post.blurDataURL || undefined}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Content */}
          <div className="space-y-2">
            {/* Title */}
            <h2 className="text-xl font-medium tracking-tight transition-colors">{post.title}</h2>

            {/* Description/Excerpt */}
            {(post.description || post.excerpt) && (
              <p className="text-muted-foreground line-clamp-4 text-sm">
                {post.description || post.excerpt}
              </p>
            )}

            <time
              dateTime={post.publishedDate || post.createdDate}
              className="text-muted-foreground text-xs"
            >
              {formattedDate}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
