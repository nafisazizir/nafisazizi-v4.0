// src/components/blog/blog-filter-wrapper.tsx
import { PostFilter } from '@/components/posts';

import { BlogPostPreview } from '@/lib/notion';

interface BlogFilterProps {
  posts: BlogPostPreview[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function BlogFilter({ posts, selectedTags, onTagsChange }: BlogFilterProps) {
  return <PostFilter posts={posts} selectedTags={selectedTags} onTagsChange={onTagsChange} />;
}
