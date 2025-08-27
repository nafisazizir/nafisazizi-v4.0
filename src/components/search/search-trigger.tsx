'use client';

import { useEffect, useState } from 'react';
import { trackSearchOpen } from '@/lib/analytics';

import { Button } from '../ui/button';
import { useSearch } from './search-context';

export function SearchTrigger() {
  const { openSearch } = useSearch();
  const [isMac, setIsMac] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const handleClick = () => {
    trackSearchOpen();
    openSearch();
  };

  // Prevent hydration mismatch by not rendering platform-specific content until mounted
  if (!hasMounted) {
    return (
      <Button
        onClick={handleClick}
        size={'sm'}
        variant={'secondary'}
        className="text-muted-foreground group shadow-none"
      >
        <span className="inline font-normal">Search...</span>
        <kbd className="bg-background group-hover:text-foreground pointer-events-none flex items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium opacity-100 transition-all duration-300 ease-in-out select-none">
          <span className="text-sm">⌘</span>K
        </kbd>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      size={'sm'}
      variant={'secondary'}
      className="text-muted-foreground group shadow-none"
    >
      <span className="inline font-normal">Search...</span>
      <kbd className="bg-background group-hover:text-foreground pointer-events-none flex items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium opacity-100 transition-all duration-300 ease-in-out select-none">
        {isMac ? <span className="text-sm">⌘</span> : <span>Ctrl</span>}K
      </kbd>
    </Button>
  );
}
