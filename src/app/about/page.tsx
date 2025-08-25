import Image from 'next/image';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function About() {
  const images = [
    {
      filename: 'me.png',
      description: 'Just',
      bold: 'me',
    },
    {
      filename: 'sealy-tarns.png',
      description: 'Sealy Tarns,',
      bold: 'Mt. Cook',
    },
    {
      filename: 'tahoe.png',
      description: 'Lake Tahoe,',
      bold: 'California',
    },
    {
      filename: 'sea.png',
      description: 'Backpacking,',
      bold: 'SEA',
    },
    {
      filename: 'uq-grad.jpg',
      description: 'Graduation,',
      bold: 'UQ',
    },
    {
      filename: 'half-dome.png',
      description: 'Half Dome,',
      bold: 'Yosemite',
    },
    {
      filename: 'grass.png',
      description: 'Somewhere along',
      bold: 'Milford Hwy',
    },
  ];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-foreground font-playfair text-3xl tracking-tight sm:text-4xl">
          About <span className="font-bold italic">Me</span>
        </h1>
        <div className="text-muted-foreground mt-8 text-lg">
          <ScrollArea className="w-full pb-3">
            <div className="flex w-max space-x-4">
              {images.map((image, index) => (
                <figure
                  key={index}
                  className="grayscale transition-all duration-300 ease-in-out hover:grayscale-0"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={`/me/${image.filename}`}
                      alt={image.description}
                      height={300}
                      width={300}
                      className="h-[200px] w-auto object-contain"
                      priority
                    />
                  </div>
                  <figcaption className="text-muted-foreground pt-2 text-xs">
                    {image.description}{' '}
                    <span className="text-foreground font-semibold">{image.bold}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <p>About page content coming soon...</p>
        </div>
      </div>
    </div>
  );
}
