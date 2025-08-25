// src/components/blog/blog-card-wrapper.tsx
import { PostCard } from '@/components/posts';

import { getContentConfig } from '@/lib/content-config';
import { BlogPostPreview } from '@/lib/notion';

interface BlogCardProps {
  post: BlogPostPreview;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  const config = getContentConfig('blog');
  return <PostCard post={post} config={config} className={className} />;
}
