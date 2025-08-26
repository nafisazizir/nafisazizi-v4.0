'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

import { trackEmailClick, trackSocialClick } from '@/lib/analytics';

import { Button } from '../ui/button';

const links = [
  {
    name: 'Github',
    icon: <Github className="h-5 w-5" />,
    href: 'https://github.com/nafisazizir',
    trackingName: 'github',
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="h-5 w-5" />,
    href: 'https://www.linkedin.com/in/nafisazizi/',
    trackingName: 'linkedin',
  },
  { 
    name: 'Email', 
    icon: <Mail className="h-5 w-5" />, 
    href: 'mailto:hello@nafisazizi.com',
    trackingName: 'email',
  },
];

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright */}
          <div className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Nafis Azizi Riza. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                onClick={() => {
                  if (item.trackingName === 'email') {
                    trackEmailClick();
                  } else {
                    trackSocialClick(item.trackingName);
                  }
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground h-9 w-9 cursor-pointer"
                >
                  {item.icon}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
