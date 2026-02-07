import Link from 'next/link';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function AboutSection() {
  return (
    <section id="about" className="mx-auto py-16 md:py-24">
      <div className="grid gap-6 md:grid-cols-6 md:grid-rows-2">
        <div className="transition-all md:col-span-4 md:row-span-2">
          <span className="text-muted-foreground font-mono text-xs">{'// background'}</span>
          <h2 className="mt-4 text-xl tracking-tight md:text-2xl">A bit about me</h2>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed md:text-base">
            CS grad with a double degree from{' '}
            <Link
              href="https://cs.ui.ac.id/sarjana-ilmu-komputer-kelas-internasional/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline transition-all"
            >
              University of Indonesia
            </Link>{' '}
            and{' '}
            <Link
              href="https://study.uq.edu.au/study-options/programs/bachelor-computer-science-2451"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline transition-all"
            >
              University of Queensland
            </Link>{' '}
            (
            <Link
              href="https://study.uq.edu.au/study-options/programs/bachelor-computer-science-2559/data-science-datasc2559"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline transition-all"
            >
              Data Science
            </Link>{' '}
            major). Exchange semester at{' '}
            <Link
              href="https://nus.edu.sg/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline transition-all"
            >
              NUS
            </Link>{' '}
            opened my perspective on the world.
          </p>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed md:text-base">
            I build things that people genuinely find useful: productivity tools students rely on,
            AI-powered browser extensions that change how people learn, and apps that thousands of
            creators use.
          </p>
        </div>

        <div className="flex w-fit flex-col md:col-span-2">
          <span className="text-muted-foreground mb-4 font-mono text-xs">{'// ping'}</span>
          <div className="flex flex-col gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className="flex cursor-pointer items-center gap-2 text-start"
                  aria-label="View location: Surabaya, Indonesia"
                >
                  <span className="text-muted-foreground/50 font-mono text-xs">1</span>
                  <span className="text-muted-foreground font-mono text-sm">
                    007.2575°S 112.7521°E
                  </span>
                </TooltipTrigger>
                <TooltipContent>🇮🇩 Surabaya, ID — origin</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  className="flex cursor-pointer items-center gap-2 text-start"
                  aria-label="View location: Brisbane, Australia"
                >
                  <span className="text-muted-foreground/50 font-mono text-xs">2</span>
                  <span className="text-muted-foreground font-mono text-sm">
                    027.4698°S 153.0251°E
                  </span>
                </TooltipTrigger>
                <TooltipContent>🇦🇺 Brisbane, AU — current</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </section>
  );
}
