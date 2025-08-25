// src/components/posts/post-card.tsx
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { BasePostPreview, ContentConfig } from '@/types/content';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
            {/* Date and Tags */}
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <time dateTime={post.publishedDate || post.createdDate}>{formattedDate}</time>
              {post.tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-xs">+{post.tags.length - 2}</span>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold tracking-tight transition-colors">{post.title}</h2>

            {/* Description/Excerpt */}
            {(post.description || post.excerpt) && (
              <p className="text-muted-foreground line-clamp-4 text-sm">
                {post.description || post.excerpt}
              </p>
            )}

            {/* Read More */}
            <div className="pt-2">
              <span className="text-primary flex flex-row items-center gap-1 text-sm font-medium">
                Read more
                <span className="transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
