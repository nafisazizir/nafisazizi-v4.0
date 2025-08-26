import Image from 'next/image';

import { AboutContent } from '@/components/about';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { getAboutPage } from '@/lib/content';

export async function generateMetadata() {
  try {
    const aboutPage = await getAboutPage();
    return {
      title: 'About Me | Nafis Azizi Riza',
      description:
        'Learn more about Nafis Azizi Riza - Software Engineer passionate about building digital experiences that make a difference.',
      openGraph: {
        title: 'About Me | Nafis Azizi Riza',
        description:
          'Learn more about Nafis Azizi Riza - Software Engineer passionate about building digital experiences that make a difference.',
        type: 'website',
        images: aboutPage.coverImage ? [aboutPage.coverImage] : undefined,
      },
    };
  } catch (error) {
    console.log('Error:', error);
    return {
      title: 'About Me | Nafis Azizi Riza',
      description:
        'Learn more about Nafis Azizi Riza - Software Engineer passionate about building digital experiences that make a difference.',
    };
  }
}

export default async function About() {
  // Fetch the About page content from Notion
  let aboutPage;
  try {
    aboutPage = await getAboutPage();
  } catch (error) {
    console.error('Failed to load About page:', error);
    aboutPage = null;
  }

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
      filename: 'uq-grad.JPG',
      description: 'Graduation,',
      bold: 'UQ',
    },
    {
      filename: 'half-dome.png',
      description: 'Half Dome,',
      bold: 'Yosemite',
    },
    {
      filename: 'milford.png',
      description: 'Somewhere along',
      bold: 'Milford Hwy',
    },
  ];

  return (
    <div className="m-auto max-w-3xl py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-foreground font-playfair text-3xl tracking-tight sm:text-4xl">
          About <span className="font-bold italic">Me</span>
        </h1>
        <div className="mt-8 text-lg">
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

          {/* Notion Content */}
          <div className="mt-6">
            {aboutPage ? (
              <AboutContent page={aboutPage} />
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  Unable to load content. Please try again later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
