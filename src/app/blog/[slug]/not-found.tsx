import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="m-auto max-w-3xl py-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
          Blog Post Not Found
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Sorry, we couldn&apos;t find the blog post you&apos;re looking for.
        </p>
        <div className="mt-8">
          <Link
            href="/blog"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
