'use client';

import { useEffect } from 'react';

import { trackCommentView } from '@/lib/analytics';

import { Giscus } from './giscus';

interface CommentsProps {
  /**
   * Title of the post/page for better context
   */
  title?: string;
  /**
   * Custom class name for the container
   */
  className?: string;
}

export function Comments({ title, className = '' }: CommentsProps) {
  // Track when comments section is viewed
  useEffect(() => {
    if (title) {
      trackCommentView(title);
    }
  }, [title]);

  return (
    <section className={`mt-16 ${className}`}>
      <div className="giscus-container">
        <Giscus
          category="General"
          mapping="pathname"
          reactionsEnabled={true}
          inputPosition="bottom"
          loading="lazy"
        />
      </div>
    </section>
  );
}
