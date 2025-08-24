import { BlogList } from '@/components/blog';

import { getAllBlogPosts } from '@/lib/content';

export default async function Blog() {
  const posts = await getAllBlogPosts();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">Blog</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Thoughts, ideas, and learnings from my journey as a software engineer.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">
              No blog posts published yet. Check back soon!
            </p>
          </div>
        ) : (
          <BlogList posts={posts} />
        )}
      </div>
    </div>
  );
}
