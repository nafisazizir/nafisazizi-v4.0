// src/components/projects/project-filter.tsx
import { PostFilter } from '@/components/posts';

import { ProjectPreview } from '@/lib/notion/project-types';

interface ProjectFilterProps {
  posts: ProjectPreview[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function ProjectFilter({ posts, selectedTags, onTagsChange }: ProjectFilterProps) {
  return <PostFilter posts={posts} selectedTags={selectedTags} onTagsChange={onTagsChange} />;
}
