import { ProjectList } from '@/components/projects';

import { getAllProjects } from '@/lib/content';

export default async function Projects() {
  const projects = await getAllProjects();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
          <p className="text-muted-foreground mt-4 text-lg">
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
