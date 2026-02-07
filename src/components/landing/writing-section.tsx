import Link from 'next/link';

import { Button } from '@/components/ui/button';

const debriefs = [
  { number: '03', title: 'Hostel Chronicles', slug: 'debrief-episode-3-hostel-chronicles' },
  {
    number: '02',
    title: 'Finding the Adventurer Within',
    slug: 'debrief-episode-2-finding-the-adventurer-within',
  },
  {
    number: '01',
    title: 'Crossing Impossible Distances',
    slug: 'debrief-episode-1-crossing-impossible-distances',
  },
];

export function WritingSection() {
  return (
    <section id="writing" className="mx-auto py-16 md:py-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <span className="text-muted-foreground font-mono text-xs">{'// writing'}</span>
          <h2 className="mt-2 text-2xl tracking-tight md:text-3xl">Debrief series</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Story-first reflections from travel and life.
          </p>
        </div>
        <Button variant="ghost" size="sm" className="font-mono text-xs" asChild>
          <Link href="/blog">{'>'} view all</Link>
        </Button>
      </div>

      <div className="mt-8">
        {debriefs.map((entry) => (
          <Link
            key={entry.slug}
            href={`/blog/${entry.slug}`}
            className="group border-border hover:border-foreground/20 flex items-center justify-between border-b py-4 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-6 font-mono text-xs">{entry.number}</span>
              <span className="group-hover:text-foreground text-sm font-medium transition-colors">
                {entry.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
