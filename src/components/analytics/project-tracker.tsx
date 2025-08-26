'use client';

import { useEffect } from 'react';

import { trackProjectView } from '@/lib/analytics';

interface ProjectPageTrackerProps {
  projectTitle: string;
  children: React.ReactNode;
}

export function ProjectPageTracker({ projectTitle, children }: ProjectPageTrackerProps) {
  useEffect(() => {
    // Track project view when component mounts
    trackProjectView(projectTitle);
  }, [projectTitle]);

  return <>{children}</>;
}
