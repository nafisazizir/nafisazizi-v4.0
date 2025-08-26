'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { trackScrollDepth, trackTimeOnPage } from '@/lib/analytics';

interface PageAnalyticsProps {
  pageTitle: string;
}

export function PageAnalytics({ pageTitle }: PageAnalyticsProps) {
  const pathname = usePathname();
  const startTime = useRef<number>(Date.now());
  const scrollThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    startTime.current = Date.now();
    scrollThresholds.current.clear();

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track at 25%, 50%, 75%, 90%, and 100% scroll depths
      const thresholds = [25, 50, 75, 90, 100];
      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !scrollThresholds.current.has(threshold)) {
          scrollThresholds.current.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    // Track time on page when user leaves
    const handleBeforeUnload = () => {
      const timeSpent = (Date.now() - startTime.current) / 1000; // Convert to seconds
      if (timeSpent > 5) { // Only track if user spent more than 5 seconds
        trackTimeOnPage(pageTitle, timeSpent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Track time when component unmounts (page change)
      const timeSpent = (Date.now() - startTime.current) / 1000;
      if (timeSpent > 5) {
        trackTimeOnPage(pageTitle, timeSpent);
      }
    };
  }, [pageTitle, pathname]);

  return null;
}
