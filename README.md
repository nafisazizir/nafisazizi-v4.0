# Nafis Azizi Portfolio v4.0

A modern, minimalist portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## Phase 1 Complete ✅

### Layout & Navigation

- **Header Component**: Clean, minimal header with logo and navigation
- **Footer Component**: Simple footer with social links
- **Mobile Navigation**: Sheet-based mobile menu using shadcn/ui
- **Theme Support**: Dark/light mode toggle with system preference detection
- **Typography**: Inter font properly configured with all weights (100-900)
- **Responsive Design**: Mobile-first approach with proper breakpoints

### Components Created

- `components/ui/button.tsx` - Shadcn button component
- `components/ui/sheet.tsx` - Shadcn sheet component for mobile navigation
- `components/theme-provider.tsx` - Theme context provider
- `components/theme-toggle.tsx` - Dark/light mode toggle
- `components/layout/header.tsx` - Main header with navigation
- `components/layout/footer.tsx` - Footer with social links
- `components/layout/mobile-navigation.tsx` - Mobile sheet navigation

### Pages Created

- `/` - Home page with hero section
- `/about` - About page (placeholder)
- `/projects` - Projects page (placeholder)
- `/blog` - Blog page (placeholder)

### Dependencies Added

- `@radix-ui/react-dialog` - For sheet component
- `@radix-ui/react-slot` - For button component
- `next-themes` - For theme management

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with custom CSS properties
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: Custom color system with dark/light mode support

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Design System

The site uses a sophisticated color system with CSS custom properties supporting both light and dark themes. The color palette includes:

- **Primary**: Blue tones for accent elements
- **Secondary**: Neutral grays for text and backgrounds
- **Surface**: Clean backgrounds with subtle variations
- **Semantic Colors**: Success, warning, error states

## Next Steps (Phase 2)

### Hero Section & Home Page

- [ ] Implement typing animation for hero text
- [ ] Add call-to-action buttons
- [ ] Create featured projects section
- [ ] Add works/experience section

### Content Management

- [ ] Set up MDX for blog posts
- [ ] Migrate existing blog content
- [ ] Create project showcase cards
- [ ] Implement dynamic routing for blog/project details

### Enhanced Features

- [ ] Add search functionality
- [ ] Implement animations with Framer Motion
- [ ] Add contact form
- [ ] Set up SEO optimization

## Notes

The current implementation focuses on clean, minimal design with excellent accessibility and performance. The color system is more sophisticated than typical implementations, providing excellent contrast and theming capabilities.

The mobile navigation uses a slide-out sheet that feels modern and native, while the desktop navigation maintains simplicity and clarity.
