import { ProjectListSkeleton } from '@/components/projects';

export default function ProjectsLoading() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Projects
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            A showcase of my work, side projects, and experiments.
          </p>
        </header>

        <ProjectListSkeleton cardCount={6} />
      </div>
    </div>
  );
}
