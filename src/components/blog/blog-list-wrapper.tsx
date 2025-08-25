// src/components/blog/blog-list-wrapper.tsx
import { PostList } from '@/components/posts';

import { getContentConfig } from '@/lib/content-config';
import { BlogPostPreview } from '@/lib/notion';

interface BlogListProps {
  posts: BlogPostPreview[];
}

export function BlogList({ posts }: BlogListProps) {
  const config = getContentConfig('blog');
  return <PostList posts={posts} config={config} />;
}
