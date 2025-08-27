'use client';

import { useEffect, useRef } from 'react';

import { useTheme } from 'next-themes';

interface GiscusProps {
  /**
   * The category where the discussions will be created.
   */
  category?: string;
  /**
   * Choose how giscus will match your pages to discussions.
   */
  mapping?: 'pathname' | 'url' | 'title' | 'og:title';
  /**
   * Whether to enable reactions for the main post.
   */
  reactionsEnabled?: boolean;
  /**
   * Where to place the comment input box.
   */
  inputPosition?: 'top' | 'bottom';
  /**
   * Loading mode for giscus.
   */
  loading?: 'lazy' | 'eager';
}

export function Giscus({
  category = 'General',
  mapping = 'pathname',
  reactionsEnabled = true,
  inputPosition = 'bottom',
  loading = 'lazy',
}: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // Giscus configuration from environment variables or fallback to hardcoded
  const giscusConfig = {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO || 'nafisazizir/nafisazizi-v4.0',
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || 'R_kgDOPkW08g',
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || category,
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'DIC_kwDOPkW08s4CumG7',
    mapping,
    strict: '0',
    reactionsEnabled: reactionsEnabled ? '1' : '0',
    emitMetadata: '0',
    inputPosition,
    theme: resolvedTheme === 'dark' ? 'dark' : 'light',
    lang: 'en',
    loading,
  };

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    // Set all the data attributes
    Object.entries(giscusConfig).forEach(([key, value]) => {
      const dataKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      scriptElem.setAttribute(`data-${dataKey}`, String(value));
    });

    ref.current.appendChild(scriptElem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle theme changes
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (!iframe) return;

    const theme = resolvedTheme === 'dark' ? 'dark' : 'light';
    iframe.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [resolvedTheme]);

  return <div ref={ref} />;
}
