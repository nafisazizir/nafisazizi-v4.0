// src/components/blog/blog-card.tsx
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { BlogPostPreview } from '@/lib/notion';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPostPreview;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
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
      <Link href={`/blog/${post.slug}`} className="block">
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
                      <span key={tag} className="bg-secondary rounded-full px-2 py-1 text-xs">
                        {tag}
                      </span>
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
