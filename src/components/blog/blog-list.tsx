'use client'

import { useState, useMemo } from 'react'
import { BlogCard, BlogFilter } from '@/components/blog'
import { BlogPostPreview } from '@/lib/notion'

interface BlogListProps {
  posts: BlogPostPreview[]
}

export function BlogList({ posts }: BlogListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Filter posts based on selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return posts
    }
    
    return posts.filter((post) =>
      selectedTags.some((tag) => post.tags.includes(tag))
    )
  }, [posts, selectedTags])

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags)
  }

  return (
    <div className="space-y-8">
      {/* Filter Section */}
      <BlogFilter
        posts={posts}
        selectedTags={selectedTags}
        onTagsChange={handleTagsChange}
      />

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-lg">
            {selectedTags.length > 0 
              ? "No blog posts found matching the selected filters."
              : "No blog posts published yet. Check back soon!"
            }
          </p>
          {selectedTags.length > 0 && (
            <button 
              onClick={() => setSelectedTags([])}
              className="mt-2 text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Results count */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredPosts.length} of {posts.length} post{posts.length !== 1 ? 's' : ''}
            {selectedTags.length > 0 && (
              <span>
                {' '}matching {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
