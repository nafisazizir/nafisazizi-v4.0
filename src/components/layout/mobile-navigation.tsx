'use client';

import { useState } from 'react';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { cn } from '@/lib/utils';

interface MobileNavProps {
  navigation: readonly {
    name: string;
    href: string;
  }[];
}

export function MobileNavigation({ navigation }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <VisuallyHidden.Root>
            <SheetTitle className="text-left">Navigation</SheetTitle>
          </VisuallyHidden.Root>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
              <Button
                variant={'ghost'}
                className={cn(
                  'w-full cursor-pointer justify-start',
                  pathname == item.href
                    ? 'bg-accent'
                    : 'text-muted-foreground hover:text-muted-foreground',
                )}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
