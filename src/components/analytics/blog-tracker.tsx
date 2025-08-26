'use client';

import { useEffect } from 'react';

import { trackBlogView } from '@/lib/analytics';

interface BlogPageTrackerProps {
  blogTitle: string;
  children: React.ReactNode;
}

export function BlogPageTracker({ blogTitle, children }: BlogPageTrackerProps) {
  useEffect(() => {
    // Track blog view when component mounts
    trackBlogView(blogTitle);
  }, [blogTitle]);

  return <>{children}</>;
}
