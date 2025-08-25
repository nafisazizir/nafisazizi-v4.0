// src/components/about/about-content.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import rehypePrism from 'rehype-prism-plus';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { mdxComponents } from '@/components/posts/mdx-components';

import type { AboutPage } from '@/lib/notion/about';

interface AboutContentProps {
  page: AboutPage;
}

export function AboutContent({ page }: AboutContentProps) {
  return (
    <div className="space-y-8">
      {/* Cover Image */}
      {page.coverImage && (
        <div className="aspect-video overflow-hidden rounded-lg">
          <Image
            src={page.coverImage}
            alt={page.title}
            width={800}
            height={450}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote
          source={page.content ?? ''}
          components={mdxComponents}
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

      {/* Last updated */}
      <div className="text-muted-foreground mt-8 text-sm">
        Last updated:{' '}
        {new Date(page.lastEdited).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </div>
  );
}
