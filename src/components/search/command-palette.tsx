'use client';

import { useEffect, useState } from 'react';

import { ChevronRight, CornerDownLeft } from 'lucide-react';
import {
  BookOpen,
  ExternalLink,
  FileText,
  FolderOpen,
  Github,
  Home,
  Linkedin,
  Mail,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

import { trackEvent, trackSearch } from '@/lib/analytics';

import { useSearch } from './search-context';

// Types for search items
interface SearchItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  icon: React.ReactNode;
  category: string;
  external?: boolean;
}

// Static pages
const pages: SearchItem[] = [
  {
    id: 'home',
    title: 'Home',
    description: 'Welcome page and introduction',
    href: '/',
    icon: <Home className="h-3 w-3" />,
    category: 'Pages',
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Thoughts, ideas, and learnings',
    href: '/blog',
    icon: <BookOpen className="h-3 w-3" />,
    category: 'Pages',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Portfolio and work showcase',
    href: '/projects',
    icon: <FolderOpen className="h-3 w-3" />,
    category: 'Pages',
  },
  {
    id: 'about',
    title: 'About',
    description: 'Learn more about me',
    href: '/about',
    icon: <User className="h-3 w-3" />,
    category: 'Pages',
  },
];

// Quick actions
const quickActions: SearchItem[] = [
  {
    id: 'contact',
    title: 'Contact me',
    description: 'Send an email',
    href: 'mailto:hello@nafisazizi.com',
    icon: <Mail className="h-3 w-3" />,
    category: 'Actions',
    external: true,
  },
  {
    id: 'resume',
    title: 'View Resume',
    description: 'Check out my professional resume',
    href: 'https://resume.nafisazizi.com/',
    icon: <FileText className="h-3 w-3" />,
    category: 'Links',
    external: true,
  },
  {
    id: 'github',
    title: 'GitHub Profile',
    description: 'View my code repositories',
    href: 'https://github.com/nafisazizir',
    icon: <Github className="h-3 w-3" />,
    category: 'Links',
    external: true,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Profile',
    description: 'Professional networking',
    href: 'https://www.linkedin.com/in/nafisazizi/',
    icon: <Linkedin className="h-3 w-3" />,
    category: 'Links',
    external: true,
  },
];

export function CommandPalette() {
  const { isOpen, closeSearch, toggleSearch } = useSearch();
  const [blogPosts, setBlogPosts] = useState<SearchItem[]>([]);
  const [projects, setProjects] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Load blog posts and projects via API when command palette opens
  useEffect(() => {
    if (isOpen && (blogPosts.length === 0 || projects.length === 0)) {
      loadContent();
    }
  }, [isOpen, blogPosts.length, projects.length]);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      // Load blog posts via API route
      const blogResponse = await fetch('/api/search/blog');
      if (blogResponse.ok) {
        const blogData = await blogResponse.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blogItems: SearchItem[] = blogData.map((post: any) => ({
          id: `blog-${post.slug}`,
          title: post.title,
          description: post.description,
          href: `/blog/${post.slug}`,
          icon: <BookOpen className="h-3 w-3" />,
          category: 'Blog Posts',
        }));
        setBlogPosts(blogItems);
      }

      // Load projects via API route
      const projectResponse = await fetch('/api/search/projects');
      if (projectResponse.ok) {
        const projectData = await projectResponse.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const projectItems: SearchItem[] = projectData.map((project: any) => ({
          id: `project-${project.slug}`,
          title: project.title,
          description: project.description,
          href: `/projects/${project.slug}`,
          icon: <FolderOpen className="h-3 w-3" />,
          category: 'Projects',
        }));
        setProjects(projectItems);
      }
    } catch (error) {
      console.error('Failed to load content for search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Keyboard shortcut handler
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearch();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleSearch]);

  const handleSelect = (item: SearchItem) => {
    closeSearch();

    // Track the search/selection
    trackSearch(item.title);

    if (item.external) {
      // Track external link clicks
      trackEvent('click', 'search_external', item.title);
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else {
      // Track internal navigation
      trackEvent('click', 'search_navigate', item.title);
      router.push(item.href);
    }
  };

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={closeSearch}
      className="outline-border/60 border-0 outline-4"
    >
      <CommandInput
        placeholder="Type to search pages, posts, projects..."
        onValueChange={(value) => {
          if (value) {
            trackEvent('search', 'command_palette', value);
          }
        }}
      />
      <CommandList>
        <CommandEmpty>{isLoading ? 'Loading content...' : 'No results found.'}</CommandEmpty>

        {/* Pages */}
        <CommandGroup heading="Pages">
          {pages.map((item) => (
            <CommandItem
              key={item.id}
              value={`${item.title} ${item.description}`}
              onSelect={() => handleSelect(item)}
            >
              {item.icon}
              <div className="ml-1 font-medium">{item.title}</div>
              {item.description && (
                <>
                  <div className="text-muted-foreground text-xs">—</div>
                  <div className="text-muted-foreground line-clamp-1 text-xs">
                    {item.description}
                  </div>
                </>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Blog Posts */}
        {blogPosts.length > 0 && (
          <>
            <CommandSeparator className="mb-2" />
            <CommandGroup heading="Blog Posts">
              {blogPosts.slice(0, 5).map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.description}`}
                  onSelect={() => handleSelect(item)}
                >
                  {item.icon}
                  <div className="ml-1 line-clamp-1 font-medium">{item.title}</div>
                </CommandItem>
              ))}
              {blogPosts.length > 5 && (
                <CommandItem
                  onSelect={() =>
                    handleSelect({
                      id: 'all-blog',
                      title: 'View all blog posts',
                      href: '/blog',
                      icon: <BookOpen className="h-3 w-3" />,
                      category: 'Navigation',
                    })
                  }
                >
                  <span className="text-muted-foreground ml-2 text-sm">
                    View all {blogPosts.length} blog posts
                  </span>
                  <ChevronRight />
                </CommandItem>
              )}
            </CommandGroup>
          </>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <>
            <CommandSeparator className="mb-2" />
            <CommandGroup heading="Projects">
              {projects.slice(0, 5).map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.description}`}
                  onSelect={() => handleSelect(item)}
                >
                  {item.icon}
                  <div className="ml-2">
                    <div className="line-clamp-1 text-sm font-medium">{item.title}</div>
                  </div>
                </CommandItem>
              ))}
              {projects.length > 5 && (
                <CommandItem
                  onSelect={() =>
                    handleSelect({
                      id: 'all-projects',
                      title: 'View all projects',
                      href: '/projects',
                      icon: <FolderOpen className="h-3 w-3" />,
                      category: 'Navigation',
                    })
                  }
                >
                  <span className="text-muted-foreground ml-2 text-sm">
                    View all {projects.length} projects
                  </span>
                  <ChevronRight />
                </CommandItem>
              )}
            </CommandGroup>
          </>
        )}

        {/* Quick Actions & Links */}
        <CommandSeparator className="mb-2" />
        <CommandGroup heading="Quick Actions">
          {quickActions.map((item) => (
            <CommandItem
              key={item.id}
              value={`${item.title} ${item.description}`}
              onSelect={() => handleSelect(item)}
            >
              {item.icon}
              <div className="ml-1 font-medium">{item.title}</div>
              {item.description && (
                <>
                  <div className="text-muted-foreground text-xs">—</div>
                  <div className="text-muted-foreground line-clamp-1 text-xs">
                    {item.description}
                  </div>
                </>
              )}
              {item.external && <ExternalLink className="ml-auto h-3 w-3 opacity-50" />}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      <div className="text-muted-foreground flex items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 py-3 text-xs dark:border-t-neutral-700 dark:bg-neutral-800">
        <kbd className="bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3">
          <CornerDownLeft className="h-3 w-3" />
        </kbd>
        <span className="text-xs">Go to page</span>
      </div>
    </CommandDialog>
  );
}
