// src/components/blog/blog-content-wrapper.tsx
import { PostContent } from '@/components/posts';

import { BlogPost } from '@/lib/notion';

interface BlogContentProps {
  post: BlogPost;
}

export function BlogContent({ post }: BlogContentProps) {
  return <PostContent post={post} />;
}
