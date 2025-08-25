// src/components/posts/mdx-components.tsx
// Custom MDX components for optimized rendering
import { MDXComponents } from 'mdx/types';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

function OptimizedImage({ src, alt = '', width, height }: OptimizedImageProps) {
  // Check if it's a local optimized image (could be blog or project images)
  const isLocalImage = src.startsWith('/blog-images/') || src.startsWith('/project-images/');

  if (isLocalImage) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 450}
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    );
  }

  // Fallback for external images
  return <img src={src} alt={alt} className="h-auto max-w-full rounded-lg" loading="lazy" />;
}

export const mdxComponents: MDXComponents = {
  img: OptimizedImage,
  h1: ({ children }) => <h1 className="mb-4 text-3xl font-bold tracking-tight">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-3 text-2xl font-semibold tracking-tight">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-2 text-xl font-semibold">{children}</h3>,
  p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
  blockquote: ({ children }) => (
    <blockquote className="border-foreground/50 text-muted-foreground my-6 border-l-4 pl-4 italic">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="bg-muted my-6 overflow-x-auto rounded-lg p-4">{children}</pre>
  ),
};
