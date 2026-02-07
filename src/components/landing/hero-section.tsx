'use client';

import Link from 'next/link';

import { trackChatWithMeClick } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { useTypewriter } from '@/hooks/use-typewriter';

const TERMINAL_WORDS = ['whoami', 'nafis azizi riza'];

export function HeroSection() {
  const text = useTypewriter({ words: TERMINAL_WORDS });

  return (
    <section className="py-24 md:py-32 min-h-svh sm:min-h-fit flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-4xl sm:text-5xl tracking-tighter md:text-6xl lg:text-7xl">
          Welcome to my finely tuned digital sanctuary.
        </h1>
        <p className="text-muted-foreground mt-6 text-lg leading-relaxed md:text-xl lg:text-2xl max-w-2xl">
          Shipping products and chasing stories out in the world.
        </p>

        <div className="mt-8 w-full max-w-sm rounded-lg border border-border px-4 py-3 font-mono font-medium text-sm flex items-center">
          <span className="text-muted-foreground mr-2">{'>'}</span>
          <span className="text-foreground">{text}</span>
          <span className="animate-pulse text-muted-foreground text-base">|</span>
        </div>

        <div className="flex gap-4 mt-8 flex-wrap">
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
