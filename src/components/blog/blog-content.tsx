// src/components/blog/blog-content.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import rehypePrism from 'rehype-prism-plus';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { BlogPost } from '@/lib/notion';

interface BlogContentProps {
  post: BlogPost;
}

export function BlogContent({ post }: BlogContentProps) {
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
    <article className="mx-auto">
      {/* Header */}
      <header className="mb-10 space-y-3">
        {/* Meta */}
        <div className="text-muted-foreground flex items-center justify-center gap-2 self-center text-sm">
          {post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-secondary rounded-full px-2 py-1 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-foreground text-center text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        <div className="text-muted-foreground flex items-center justify-center gap-2 self-center text-sm">
          <time dateTime={post.publishedDate || post.createdDate}>{formattedDate}</time>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="mb-8 aspect-video overflow-hidden rounded-lg">
          <Image 
            src={post.coverImage} 
            alt={post.title} 
            width={800}
            height={450}
            className="h-full w-full object-cover" 
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content ?? ''}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkBreaks],
              rehypePlugins: [
                [
                  rehypePrism,
                  {
                    ignoreMissing: true,
                    showLineNumbers: true,
                    aliases: {
                      js: 'javascript',
                      py: 'python',
                      sh: 'bash',
                      ts: 'typescript',
                    },
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
