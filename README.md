# Nafis Azizi Riza

A modern, performant personal portfolio and blog built with Next.js 15, featuring Notion CMS integration, advanced analytics, and a comprehensive search system.

## ✨ Features

### 🎨 **Modern Design System**

- **Dark/Light Theme** - System-aware theme with smooth transitions
- **Typography** - Inter & Playfair Display fonts with custom weight configuration
- **Responsive Design** - Mobile-first approach with Tailwind CSS 4
- **Component Library** - Built with shadcn/ui and Radix UI primitives

### 📝 **Content Management**

- **Notion CMS Integration** - Blog posts and projects managed via Notion
- **Static Generation** - Pre-build content generation with image optimization
- **MDX Support** - Rich content with syntax highlighting and GitHub Flavored Markdown
- **Image Processing** - Automatic WebP conversion, resizing, and blur placeholders

### 🔍 **Advanced Search**

- **CMD+K Search Palette** - Fast, keyboard-driven search across all content
- **Real-time Results** - Search through pages, blog posts, projects, and actions
- **Analytics Integration** - Track search usage and popular queries

### 📊 **Comprehensive Analytics**

- **Google Analytics 4** - Full GA4 integration with custom event tracking
- **User Behavior Tracking** - Page views, interactions, scroll depth, and time on page
- **Conversion Tracking** - Contact attempts, social clicks, and external links
- **Search Analytics** - Command palette usage and search patterns

### 🚀 **Performance & SEO**

- **Next.js 15** - Latest App Router with React 19
- **Static Site Generation** - Build-time content generation for optimal performance
- **Image Optimization** - Sharp-powered image processing and lazy loading
- **SEO Optimized** - Proper meta tags, OpenGraph, and structured data

## 🛠 Tech Stack

### **Core Framework**

- **[Next.js 15](https://nextjs.org)** with App Router
- **[React 19](https://react.dev)** with latest features
- **[TypeScript](https://typescriptlang.org)** for type safety

### **Styling & UI**

- **[Tailwind CSS 4](https://tailwindcss.com)** with custom design system
- **[shadcn/ui](https://ui.shadcn.com)** component library
- **[Radix UI](https://radix-ui.com)** for accessible primitives
- **[Lucide React](https://lucide.dev)** for icons

### **Content & Data**

- **[Notion API](https://developers.notion.com)** as headless CMS
- **[MDX](https://mdxjs.com)** for rich content rendering
- **[Sharp](https://sharp.pixelplumbing.com)** for image optimization

### **Analytics & Integrations**

- **[Google Analytics 4](https://analytics.google.com)** for comprehensive tracking
- **[cmdk](https://cmdk.paco.me)** for command palette search

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── api/search/          # Search API endpoints
│   ├── blog/[slug]/         # Dynamic blog post pages
│   ├── projects/[slug]/     # Dynamic project pages
│   └── globals.css          # Global styles and design tokens
├── components/
│   ├── analytics/           # GA4 tracking components
│   ├── search/              # CMD+K search implementation
│   ├── blog/                # Blog-specific components
│   ├── projects/            # Project-specific components
│   ├── posts/               # Shared post components
│   ├── layout/              # Header, footer, navigation
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── analytics/           # GA4 configuration and helpers
│   ├── notion/              # Notion API integration
│   ├── content/             # Static content services
│   └── images/              # Image processing utilities
└── types/                   # TypeScript type definitions
```

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+ and npm
- Notion workspace with API access
- Google Analytics 4 property (optional)

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/nafisazizir/nafisazizi-v4.0.git
   cd nafisazizi-v4.0
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:

   ```env
   # Notion CMS
   NOTION_TOKEN=your_notion_integration_token
   NOTION_BLOG_DATABASE_ID=your_blog_database_id
   NOTION_PROJECTS_DATABASE_ID=your_projects_database_id

   # Analytics (optional)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga4_measurement_id

   ```

4. **Generate Content**

   ```bash
   npm run generate:content
   ```

5. **Start Development**
   ```bash
   npm run dev
   ```

## 📈 Key Features Deep Dive

### **Notion CMS Integration**

- **Seamless Content Management** - Write posts in Notion, automatically sync to site
- **Rich Content Support** - Images, code blocks, tables, and embedded content
- **Image Optimization** - Automatic WebP conversion and responsive sizing
- **Build-time Generation** - Content pre-rendered for optimal performance

### **Advanced Search System**

- **Keyboard-First UX** - CMD+K to open, arrow keys to navigate
- **Comprehensive Results** - Search pages, posts, projects, and quick actions
- **Analytics Integration** - Track search patterns and popular queries
- **Instant Results** - Client-side search with API-powered content loading

### **Analytics & Insights**

- **Behavioral Analytics** - Track user journey, engagement, and conversion
- **Content Performance** - Identify popular posts and projects
- **Search Analytics** - Understand how users discover content
- **Technical Metrics** - Page load times, scroll depth, and interaction patterns

## 🏗 Development

### **Content Generation**

```bash
npm run generate:content  # Fetch and optimize all content from Notion
npm run build            # Build optimized production bundle
npm run start            # Start production server
```

### **Code Quality**

```bash
npm run lint            # ESLint code analysis
npm run format          # Prettier code formatting
npm run format:check    # Check formatting without changes
```

### **Adding New Content**

1. Create posts in your Notion databases
2. Run `npm run generate:content` to sync
3. Content automatically appears on your site

## 📊 Analytics Dashboard

The site tracks comprehensive metrics including:

- **Traffic Analytics** - Page views, unique visitors, traffic sources
- **Content Performance** - Most popular posts and projects
- **User Engagement** - Time on page, scroll depth, interaction patterns
- **Conversion Tracking** - Contact attempts, social media clicks
- **Search Insights** - Popular queries and search patterns

## 🔧 Configuration

### **Theme Customization**

The design system uses CSS custom properties for comprehensive theming. Modify colors, typography, and spacing in `globals.css`.

### **Search Configuration**

Customize search categories and results in `src/components/search/command-palette.tsx`.

### **Analytics Events**

Add custom tracking events using the analytics helpers in `src/lib/analytics/`.

## 🚢 Deployment

### **Vercel (Recommended)**

```bash
# Connect your GitHub repository to Vercel
# Environment variables are configured in Vercel dashboard
# Automatic deployments on push to main branch
```

### **Other Platforms**

The site works on any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
