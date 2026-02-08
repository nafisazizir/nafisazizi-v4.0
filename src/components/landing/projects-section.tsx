import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { getAllProjects } from '@/lib/content';

export async function ProjectsSection() {
  const projects = await getAllProjects();
  const featured = projects.slice(0, 2);

  return (
    <section id="projects" className="mx-auto py-16 md:py-24">
      <div className="flex items-end justify-between gap-3 sm:gap-6">
        <div>
          <span className="text-muted-foreground font-mono text-xs sm:text-sm">
            {'// projects'}
          </span>
          <h2 className="mt-2 text-2xl tracking-tight md:text-3xl lg:text-4xl">Worth clicking</h2>
        </div>
        <Button variant="ghost" size="sm" className="font-mono text-xs" asChild>
          <Link href="/projects">{'>'} view all</Link>
        </Button>
      </div>

      <div className="mt-8">
        {featured.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group border-border hover:border-foreground/20 flex items-center justify-between border-b py-4 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-6 font-mono text-sm">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="group-hover:text-foreground text-sm font-medium transition-colors sm:text-base">
                {project.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
