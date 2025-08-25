'use client';

import { useMemo, useState } from 'react';

import { BasePostPreview, ContentConfig } from '@/types/content';

import { PostCard, PostFilter } from '@/components/posts';

interface PostListProps {
  posts: BasePostPreview[];
  config: ContentConfig;
}

export function PostList({ posts, config }: PostListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter posts based on selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return posts;
    }

    return posts.filter((post) => selectedTags.some((tag) => post.tags.includes(tag)));
  }, [posts, selectedTags]);

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  return (
    <div className="space-y-8">
      {/* Filter Section */}
      <PostFilter posts={posts} selectedTags={selectedTags} onTagsChange={handleTagsChange} />

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-lg">
            {selectedTags.length > 0
              ? `No ${config.plural} found matching the selected filters.`
              : `No ${config.plural} published yet. Check back soon!`}
          </p>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-primary mt-2 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} config={config} />
            ))}
          </div>

          {/* Results count */}
          <div className="text-muted-foreground text-center text-sm">
            Showing {filteredPosts.length} of {posts.length}{' '}
            {posts.length === 1 ? config.singular : config.plural}
            {selectedTags.length > 0 && (
              <span>
                {' '}
                matching {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
