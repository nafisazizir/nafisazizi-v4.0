'use client';

import { useState } from 'react';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

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
        <NavigationMenu orientation="vertical" className="mt-8 max-w-none [&>div]:w-full">
          <NavigationMenuList className="flex-col items-stretch gap-2">
            {navigation.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild active={pathname === item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={navigationMenuTriggerStyle() + ' w-full justify-start'}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}
