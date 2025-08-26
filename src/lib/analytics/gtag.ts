// Google Analytics configuration and helper functions
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      config?: Record<string, any>,
    ) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (!GA_MEASUREMENT_ID) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!GA_MEASUREMENT_ID) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Specific event tracking functions for your site
export const trackEmailClick = () => {
  trackEvent('click', 'contact', 'email');
};

export const trackSocialClick = (platform: string) => {
  trackEvent('click', 'social', platform);
};

export const trackProjectView = (projectName: string) => {
  trackEvent('view', 'project', projectName);
};

export const trackBlogView = (blogTitle: string) => {
  trackEvent('view', 'blog', blogTitle);
};

export const trackChatWithMeClick = () => {
  trackEvent('click', 'cta', 'chat_with_me');
};

export const trackResumeClick = () => {
  trackEvent('click', 'external_link', 'resume');
};

export const trackLinkedInClick = () => {
  trackEvent('click', 'external_link', 'linkedin');
};

// Additional comprehensive tracking functions
export const trackPageSection = (sectionName: string) => {
  trackEvent('view', 'section', sectionName);
};

export const trackDownload = (fileName: string) => {
  trackEvent('download', 'file', fileName);
};

export const trackThemeToggle = (newTheme: string) => {
  trackEvent('interaction', 'theme', newTheme);
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', 'command_palette', searchTerm);
};

export const trackSearchOpen = () => {
  trackEvent('open', 'command_palette', 'search_trigger_click');
};

export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('click', 'external_link', linkText || url);
};

// Time tracking for engagement
export const trackTimeOnPage = (pageTitle: string, timeSpent: number) => {
  trackEvent('timing', 'page_engagement', pageTitle, Math.round(timeSpent));
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll', 'depth', `${depth}%`, depth);
};

// Comment interaction tracking
export const trackCommentView = (postTitle: string) => {
  trackEvent('view', 'comments', postTitle);
};

export const trackCommentInteraction = (action: string, postTitle: string) => {
  trackEvent(action, 'comments', postTitle);
};
