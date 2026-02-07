import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const featured = [
  {
    slug: 'uquizzle-ai-powered-study-tools',
    title: 'UQuizzle',
    description:
      'AI-powered study tools inside Echo360. Quiz generation, lecture notes, and jump-to-timestamp for specific topics.',
    image: '/me/tahoe.png',
    imageAlt: 'UQuizzle project banner',
  },
  {
    slug: 'simple-fast-http-server',
    title: 'HTTP Server',
    description:
      'A multithreaded HTTP server with kqueue on macOS. Significant improvement in throughput and reduced latency.',
    image: '/me/tahoe.png',
    imageAlt: 'HTTP Server project banner',
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto py-16 md:py-24">
      <div className="flex items-end justify-between gap-3 sm:gap-6">
        <div>
          <span className="text-muted-foreground font-mono text-xs sm:text-sm">{'// projects'}</span>
          <h2 className="mt-2 text-2xl tracking-tight md:text-3xl lg:text-4xl">Worth clicking</h2>
        </div>
        <Button variant="ghost" size="sm" className="font-mono text-xs" asChild>
          <Link href="/projects">{'>'} view all</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {featured.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
            <Card className="hover:ring-foreground/20 overflow-hidden transition-all hover:ring-1">
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={640}
                height={360}
                className="border-border aspect-video w-full border-b object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
