'use client';

import { useEffect, useRef, useState } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
}

export function useTypewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseAfterType = 2000,
  pauseAfterDelete = 500,
}: UseTypewriterOptions) {
  const [text, setText] = useState('');
  const state = useRef({ wordIndex: 0, charIndex: 0, isDeleting: false });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let cancelled = false;

    function tick() {
      if (cancelled) return;

      const { wordIndex, charIndex, isDeleting } = state.current;
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        const nextChar = charIndex + 1;
        setText(currentWord.slice(0, nextChar));
        state.current.charIndex = nextChar;

        if (nextChar === currentWord.length) {
          state.current.isDeleting = true;
          timeoutId = setTimeout(tick, pauseAfterType);
        } else {
          timeoutId = setTimeout(tick, typingSpeed);
        }
      } else {
        const nextChar = charIndex - 1;
        setText(currentWord.slice(0, nextChar));
        state.current.charIndex = nextChar;

        if (nextChar === 0) {
          state.current.isDeleting = false;
          state.current.wordIndex = (wordIndex + 1) % words.length;
          timeoutId = setTimeout(tick, pauseAfterDelete);
        } else {
          timeoutId = setTimeout(tick, deletingSpeed);
        }
      }
    }

    timeoutId = setTimeout(tick, pauseAfterDelete);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [words, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

  return text;
}
