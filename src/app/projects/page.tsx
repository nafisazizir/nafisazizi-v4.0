import { ProjectList } from '@/components/projects';

import { getAllProjects } from '@/lib/content';

export default async function Projects() {
  const projects = await getAllProjects();

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="mt-2 text-2xl tracking-tight md:text-3xl lg:text-4xl">Projects</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base lg:text-lg">
            A showcase of my work, side projects, and experiments.
          </p>
        </header>

        {projects.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">
              No projects published yet. Check back soon!
            </p>
          </div>
        ) : (
          <ProjectList posts={projects} />
        )}
      </div>
    </div>
  );
}
