import { BlogListSkeleton } from '@/components/blog';

export default function BlogLoading() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="text-foreground font-playfair text-3xl font-bold tracking-tight italic sm:text-4xl">
            Blog
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Thoughts, ideas, and learnings from my journey as a software engineer.
          </p>
        </header>

        <BlogListSkeleton cardCount={6} />
      </div>
    </div>
  );
}
