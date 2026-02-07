'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { trackEvent } from '@/lib/analytics';

import Logo from '../../../public/logo.svg';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Nav (left group) */}
          <div className="flex items-center gap-6">
            <Link href="/" onClick={() => trackEvent('click', 'navigation', 'logo')}>
              <Image src={Logo} alt="Logo" width={32} height={32} />
            </Link>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink asChild active={pathname === item.href}>
                      <Link
                        href={item.href}
                        onClick={() => trackEvent('click', 'navigation', item.name.toLowerCase())}
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Controls (right group) */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <MobileNavigation navigation={navigation} />
          </div>
        </div>
      </div>
    </header>
  );
}
