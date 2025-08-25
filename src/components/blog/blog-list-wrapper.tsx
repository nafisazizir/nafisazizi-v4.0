// src/components/blog/blog-list-wrapper.tsx
import { PostList } from '@/components/posts';
import { BlogPostPreview } from '@/lib/notion';
import { getContentConfig } from '@/lib/content-config';

interface BlogListProps {
  posts: BlogPostPreview[];
}

export function BlogList({ posts }: BlogListProps) {
  const config = getContentConfig('blog');
  return <PostList posts={posts} config={config} />;
}
