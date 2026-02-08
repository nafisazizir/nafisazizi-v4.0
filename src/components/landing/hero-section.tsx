'use client';

import { useTypewriter } from '@/hooks/use-typewriter';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { trackChatWithMeClick } from '@/lib/analytics';

const TERMINAL_WORDS = ['whoami', 'nafis azizi riza'];

export function HeroSection() {
  const text = useTypewriter({ words: TERMINAL_WORDS });

  return (
    <section className="flex min-h-svh items-center justify-center py-24 sm:min-h-fit md:py-32">
      <div className="flex flex-col">
        <h1 className="text-4xl tracking-tighter sm:text-5xl md:text-6xl lg:max-w-[70%] lg:text-7xl">
          Welcome to my finely tuned digital sanctuary.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed md:text-xl lg:text-2xl">
          Shipping products and chasing stories out in the world.
        </p>

        <div className="border-border mt-8 flex w-full max-w-sm items-center rounded-lg border px-4 py-3 font-mono text-sm font-medium">
          <span className="text-muted-foreground mr-2">{'>'}</span>
          <span className="text-foreground">{text}</span>
          <span className="text-muted-foreground animate-pulse text-base">|</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button size="lg" asChild>
            <Link href="mailto:hello@nafisazizi.com" onClick={() => trackChatWithMeClick()}>
              Chat with me
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#projects">View projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
