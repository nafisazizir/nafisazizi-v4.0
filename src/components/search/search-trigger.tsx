'use client';

import { Button } from '../ui/button';

export function SearchTrigger() {
  const isMac =
    typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <Button size={'sm'} variant={'secondary'} className="text-muted-foreground group shadow-none">
      <span className="inline font-normal">Search...</span>
      <kbd className="bg-background group-hover:text-foreground pointer-events-none flex items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium opacity-100 transition-all duration-300 ease-in-out select-none">
        <span className="text-sm">{isMac ? '⌘' : 'Ctrl'}</span>K
      </kbd>
    </Button>
  );
}
