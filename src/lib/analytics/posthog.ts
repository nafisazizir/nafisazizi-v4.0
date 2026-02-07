// PostHog Analytics configuration and helper functions
import posthog from 'posthog-js';

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// Check if PostHog is available
const isPostHogAvailable = () => {
  return typeof window !== 'undefined' && POSTHOG_KEY && posthog.__loaded;
};

// Track page views (handled by PostHogProvider, but can be called manually)
export const trackPageView = (url: string) => {
  if (!isPostHogAvailable()) return;

  posthog.capture('$pageview', {
    $current_url: url,
  });
};

// Track custom events
export const trackEvent = (
  eventName: string,
  properties?: Record<string, string | number | boolean>
) => {
  if (!isPostHogAvailable()) return;

  posthog.capture(eventName, properties);
};

// Specific event tracking functions for your site
export const trackEmailClick = () => {
  trackEvent('email_click', {
    category: 'contact',
  });
};

export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    category: 'social',
    platform,
  });
};

export const trackProjectView = (projectName: string) => {
  trackEvent('project_view', {
    category: 'project',
    project_name: projectName,
  });
};

export const trackBlogView = (blogTitle: string) => {
  trackEvent('blog_view', {
    category: 'blog',
    blog_title: blogTitle,
  });
};

export const trackChatWithMeClick = () => {
  trackEvent('chat_with_me_click', {
    category: 'cta',
  });
};

export const trackResumeClick = () => {
  trackEvent('resume_click', {
    category: 'external_link',
  });
};

export const trackLinkedInClick = () => {
  trackEvent('linkedin_click', {
    category: 'external_link',
  });
};

// Additional comprehensive tracking functions
export const trackPageSection = (sectionName: string) => {
  trackEvent('page_section_view', {
    category: 'section',
    section_name: sectionName,
  });
};

export const trackDownload = (fileName: string) => {
  trackEvent('file_download', {
    category: 'download',
    file_name: fileName,
  });
};

export const trackThemeToggle = (newTheme: string) => {
  trackEvent('theme_toggle', {
    category: 'interaction',
    theme: newTheme,
  });
};

export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('external_link_click', {
    category: 'external_link',
    url,
    link_text: linkText || url,
  });
};

// Time tracking for engagement
export const trackTimeOnPage = (pageTitle: string, timeSpent: number) => {
  trackEvent('time_on_page', {
    category: 'page_engagement',
    page_title: pageTitle,
    time_spent_seconds: Math.round(timeSpent),
  });
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    category: 'scroll',
    depth_percentage: depth,
  });
};

// Comment interaction tracking
export const trackCommentView = (postTitle: string) => {
  trackEvent('comment_view', {
    category: 'comments',
    post_title: postTitle,
  });
};

export const trackCommentInteraction = (action: string, postTitle: string) => {
  trackEvent('comment_interaction', {
    category: 'comments',
    action,
    post_title: postTitle,
  });
};

// Identify user (for product analytics - use when user logs in or provides info)
export const identifyUser = (userId: string, properties?: Record<string, string | number>) => {
  if (!isPostHogAvailable()) return;

  posthog.identify(userId, properties);
};

// Reset user session (useful for logout)
export const resetUser = () => {
  if (!isPostHogAvailable()) return;

  posthog.reset();
};
