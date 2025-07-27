'use client';

import { useEffect, useState } from 'react';

interface TerminalAnimationProps {
  className?: string;
}

export function TerminalAnimation({ className }: TerminalAnimationProps) {
  const [currentStep, setCurrentStep] = useState<'prompt' | 'typing' | 'revealing' | 'cycling'>(
    'prompt',
  );
  const [typedText, setTypedText] = useState('');
  const [revealHeight, setRevealHeight] = useState(0);
  const [currentSuffix, setCurrentSuffix] = useState('azizi');

  const command = 'whoami';

  const nafis = `
███╗   ██╗ █████╗ ███████╗██╗███████╗
████╗  ██║██╔══██╗██╔════╝██║██╔════╝
██╔██╗ ██║███████║█████╗  ██║███████╗
██║╚██╗██║██╔══██║██╔══╝  ██║╚════██║
██║ ╚████║██║  ██║██║     ██║███████║
╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝`;

  const azizi = `
 █████╗ ███████╗██╗███████╗██╗       
██╔══██╗╚══███╔╝██║╚══███╔╝██║       
███████║  ███╔╝ ██║  ███╔╝ ██║       
██╔══██║ ███╔╝  ██║ ███╔╝  ██║       
██║  ██║███████╗██║███████╗██║       
╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚═╝`;

  const riza = `
██████╗ ██╗███████╗ █████╗ 
██╔══██╗██║╚══███╔╝██╔══██╗
██████╔╝██║  ███╔╝ ███████║
██╔══██╗██║ ███╔╝  ██╔══██║
██║  ██║██║███████╗██║  ██║
╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝`;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentStep === 'prompt') {
      // Show prompt for 500ms then start typing
      timeoutId = setTimeout(() => setCurrentStep('typing'), 500);
    } else if (currentStep === 'typing') {
      // Type the command character by character
      if (typedText.length < command.length) {
        timeoutId = setTimeout(() => {
          setTypedText(command.slice(0, typedText.length + 1));
        }, 100);
      } else {
        // Finished typing, start revealing
        timeoutId = setTimeout(() => setCurrentStep('revealing'), 500);
      }
    } else if (currentStep === 'revealing') {
      // Reveal nafis text from top to bottom
      const lines = nafis.trim().split('\n');
      const totalHeight = lines.length;

      if (revealHeight < totalHeight) {
        timeoutId = setTimeout(() => {
          setRevealHeight((prev) => prev + 1);
        }, 100);
      } else {
        // Finished revealing, start cycling
        timeoutId = setTimeout(() => setCurrentStep('cycling'), 500);
      }
    } else if (currentStep === 'cycling') {
      // Cycle between azizi and riza
      timeoutId = setTimeout(() => {
        setCurrentSuffix((prev) => (prev === 'azizi' ? 'riza' : 'azizi'));
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [currentStep, typedText, revealHeight, currentSuffix, nafis]);

  const renderNafisText = () => {
    const lines = nafis.trim().split('\n');
    const visibleLines = lines.slice(0, revealHeight);

    return (
      <div className="relative">
        <pre className="text-terminal-text-info">{visibleLines.join('\n')}</pre>
      </div>
    );
  };

  const renderCurrentSuffix = () => {
    const suffixText = currentSuffix === 'azizi' ? azizi : riza;
    return <pre className="text-terminal-text-info transition-all duration-500">{suffixText}</pre>;
  };

  return (
    <div className="w-full max-w-[400px] text-xs sm:max-w-[500px] md:max-w-[600px] md:text-base">
      {/* Header */}
      <div className="w-full">
        <div className="bg-terminal-header flex h-10 w-full flex-row items-center justify-start gap-2 rounded-t-lg px-4">
          <div className="bg-terminal-error h-2.5 w-2.5 rounded-full" />
          <div className="bg-terminal-warning h-2.5 w-2.5 rounded-full" />
          <div className="bg-terminal-success h-2.5 w-2.5 rounded-full" />
        </div>

        <div
          className={`bg-terminal-background h-[250px] w-full overflow-auto rounded-b-lg p-6 font-mono leading-none sm:h-[300px] md:h-[350px] ${className}`}
        >
          <div className="space-y-2">
            {/* Command prompt */}
            <div className="flex items-center font-semibold">
              <span className="text-terminal-text-success mr-2">{'>'}</span>
              <span className="text-terminal-text-error">{typedText}</span>
              {currentStep === 'typing' && <span className="animate-pulse text-white">|</span>}
            </div>

            {/* Nafis text reveal */}
            {(currentStep === 'revealing' || currentStep === 'cycling') && (
              <div className="mt-4">
                {renderNafisText()}

                {/* Show suffix only during cycling */}
                {currentStep === 'cycling' && <div className="mt-2">{renderCurrentSuffix()}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
