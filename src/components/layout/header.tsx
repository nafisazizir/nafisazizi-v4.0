'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { trackEvent } from '@/lib/analytics';

import { cn } from '@/lib/utils';

import Logo from '../../../public/logo.svg';
import { Button } from '../ui/button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" onClick={() => trackEvent('click', 'navigation', 'logo')}>
            <Image src={Logo} alt="Logo" width={32} height={32} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => trackEvent('click', 'navigation', item.name.toLowerCase())}
              >
                <Button
                  variant={'ghost'}
                  className={cn(
                    'cursor-pointer',
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

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <MobileNavigation navigation={navigation} />
          </div>
        </div>
      </div>
    </header>
  );
}
