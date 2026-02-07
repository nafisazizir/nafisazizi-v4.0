'use client';

import Image from 'next/image';
import Link from 'next/link';

import { TerminalAnimation } from '@/components/terminal-animation';
import { Button } from '@/components/ui/button';

import { trackChatWithMeClick, trackLinkedInClick, trackResumeClick } from '@/lib/analytics';

export default function Home() {
  const emailTemplate = {
    to: 'hello@nafisazizi.com',
    subject: "Let's have a chat!",
    body: `Hi Nafis,

I'm reaching out because <your reason here>. 
My name is <Your Name>, and I thought it might be great to connect. 

Somewhere along the line, maybe we can have a chat or something.`,
  };

  const mailToLink = `mailto:${emailTemplate.to}?subject=${encodeURIComponent(
    emailTemplate.subject,
  )}&body=${encodeURIComponent(emailTemplate.body)}`;

  return (
    <div className="pb-12">
      <div className="flex flex-col gap-8 py-16 md:py-24">
        <div className="flex flex-col">
          <h1 className="text-foreground mb-4 text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Hey there!
          </h1>
          <p className="text-muted-foreground sm:text-md max-w-2xl text-base leading-relaxed lg:text-xl">
            Welcome to my finely tuned{' '}
            <span className="text-foreground font-medium">digital sanctuary.</span>
          </p>
        </div>

        <TerminalAnimation />
      </div>

      <div className="flex flex-col-reverse items-center justify-center gap-8 py-12 md:gap-16 lg:flex-row lg:gap-20">
        <div className="text-muted-foreground blog flex w-full max-w-[500px] flex-col justify-center gap-3 text-base leading-relaxed sm:gap-4 sm:text-base lg:text-lg">
          <p>
            Welcome to my digital playground! I&apos;m someone who loves solving problems with{' '}
            <span className="border-sidebar-border bg-sidebar-accent rounded-sm border px-1.5 py-1 font-mono text-sm sm:text-sm lg:text-base">
              {'<code/>'}
            </span>
            , exploring new technologies, and sharing the journey along the way.
          </p>

          <p>
            This space is a mix of everything that interests me: tech insights, travel stories,
            personal reflections, and the projects I&apos;ve built. It&apos;s where my professional
            work meets my personal curiosity.
          </p>

          <p>
            Feel free to explore, search around, or reach out via{' '}
            <a href="mailto:hello@nafisazizi.com" onClick={() => trackChatWithMeClick()}>
              email
            </a>{' '}
            if something catches your eye. For professional inquiries, my work speaks through my{' '}
            <Link href="/projects">portofolio</Link> , though fair warning - my{' '}
            <a
              href="https://resume.nafisazizi.com/"
              onClick={() => trackResumeClick()}
              target="_blank"
              rel="noopener noreferrer"
            >
              resume
            </a>{' '}
            and{' '}
            <a
              href="https://www.linkedin.com/in/nafisazizi/"
              onClick={() => trackLinkedInClick()}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{' '}
            are perpetually under construction.
          </p>
        </div>

        <div className="relative aspect-square w-48 overflow-hidden rounded-lg grayscale transition-all duration-300 ease-in-out hover:grayscale-0 md:w-full md:max-w-[350px]">
          <Image
            src="/profile-informal.png"
            alt="Nafis Azizi Riza"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 192px, 350px"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-16 text-center md:py-24">
        <p className="text-muted-foreground mb-3 text-sm sm:text-base lg:text-lg">
          Have something in mind?
        </p>
        <h2 className="text-foreground mb-8 text-3xl font-medium tracking-tight sm:text-4xl md:mb-10 lg:text-5xl xl:text-6xl">
          Let&apos;s have a chat
        </h2>

        <Link href={mailToLink}>
          <Button
            size="lg"
            className="mb-4 cursor-pointer text-sm sm:text-base"
            onClick={() => trackChatWithMeClick()}
          >
            Chat with me
          </Button>
        </Link>
        <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
          My local time{' '}
          <span className="text-foreground font-medium">
            {new Date().toLocaleTimeString('en-AU', {
              timeZone: 'Australia/Brisbane',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </p>
      </div>
    </div>
  );
}
