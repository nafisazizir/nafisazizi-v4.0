'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    if (!posthogKey) {
      return;
    }

    // Initialize PostHog
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: 'identified_only', // Only create profiles for identified users
      // Enable all three features:
      // 1. Web Analytics - automatically tracked
      // 2. Product Analytics - event tracking enabled by default
      // 3. Session Replay
      disable_session_recording: false, // Enable session replay
      session_recording: {
        recordCrossOriginIframes: false,
        maskAllInputs: true, // Privacy: mask all input fields
        maskTextSelector: '[data-ph-mask]', // Add data-ph-mask attribute to mask specific elements
      },
      // Additional privacy and performance settings
      capture_pageview: false, // We'll manually capture pageviews
      capture_pageleave: true, // Track when users leave pages
      autocapture: true, // Automatically capture clicks, form submissions, etc.
    });
  }, []);

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      // Manually capture pageviews for web analytics
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}
