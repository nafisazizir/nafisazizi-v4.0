// src/components/blog/blog-card-wrapper.tsx
import { PostCard } from '@/components/posts';
import { BlogPostPreview } from '@/lib/notion';
import { getContentConfig } from '@/lib/content-config';

interface BlogCardProps {
  post: BlogPostPreview;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  const config = getContentConfig('blog');
  return <PostCard post={post} config={config} className={className} />;
}
