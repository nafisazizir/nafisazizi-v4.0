'use client';

import { BasePostPreview } from '@/types/content';
import { Filter, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PostFilterProps {
  posts: BasePostPreview[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function PostFilter({ posts, selectedTags, onTagsChange }: PostFilterProps) {
  // Extract all unique tags from posts
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    onTagsChange(selectedTags.filter((t) => t !== tag));
  };

  const clearAllFilters = () => {
    onTagsChange([]);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Active Filter Chips - Far Left */}
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {selectedTags.map((tag) => (
          <Button
            key={tag}
            size="sm"
            variant="secondary"
            className="hover:text-muted-foreground rounded-full shadow-none"
            onClick={() => handleTagRemove(tag)}
          >
            <span>{tag}</span>
            <X className="h-1 w-1" />
            <span className="sr-only">Remove {tag} filter</span>
          </Button>
        ))}
        {selectedTags.length > 0 && (
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground rounded-full shadow-none"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Dropdown - Far Right */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="shrink-0 shadow-none">
            <Filter className="mr-2 h-4 w-4" />
            Filter
            {selectedTags.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedTags.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {allTags.map((tag) => (
            <DropdownMenuCheckboxItem
              key={tag}
              checked={selectedTags.includes(tag)}
              onCheckedChange={() => handleTagToggle(tag)}
            >
              {tag}
            </DropdownMenuCheckboxItem>
          ))}
          {allTags.length === 0 && (
            <div className="text-muted-foreground px-2 py-1.5 text-sm">No tags found</div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
