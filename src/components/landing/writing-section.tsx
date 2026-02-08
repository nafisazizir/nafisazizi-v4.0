import { Binoculars, Tent, TramFront } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { getAllBlogPosts } from '@/lib/content';

export async function WritingSection() {
  const posts = await getAllBlogPosts();
  const featured = posts.slice(0, 3);
  const icons = [Tent, Binoculars, TramFront];

  return (
    <section id="writing" className="mx-auto py-16 md:py-24">
      <div className="flex items-end justify-between gap-3 sm:gap-6">
        <div>
          <span className="text-muted-foreground font-mono text-xs sm:text-sm">{'// writing'}</span>
          <h2 className="mt-2 text-2xl tracking-tight md:text-3xl lg:text-4xl">Debrief series</h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base lg:text-lg">
            Story-first reflections from travel and life.
          </p>
        </div>
        <Button variant="ghost" size="sm" className="font-mono text-xs" asChild>
          <Link href="/blog">{'>'} view all</Link>
        </Button>
      </div>

      <div className="border-border/50 mt-8 grid border-t md:grid-cols-3">
        {featured.map((post, index) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="h-full">
            <div
              className={`border-border/50 hover:bg-muted/50 h-full border-r border-b border-l p-6 transition-colors md:p-8 ${index < 2 ? 'md:border-r' : ''} ${index > 0 ? 'md:border-l-0' : ''}`}
            >
              {(() => {
                const Icon = icons[index];
                return <Icon className="mb-5 size-6" />;
              })()}
              <h3 className="mb-3 text-xl font-medium tracking-tight md:text-2xl">
                {post.title.replace(/^Debrief\.\s*Episode\s*\d+:\s*/i, '')}
              </h3>
              <p className="text-muted-foreground mb-3 line-clamp-4 text-sm">{post.description}</p>
              <span className="text-muted-foreground text-sm">
                {new Date(post.publishedDate ?? post.createdDate).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
