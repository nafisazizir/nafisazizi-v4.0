# Comments System with Giscus

## Overview

Comments and discussions powered by GitHub Discussions via Giscus, seamlessly integrated with the site's design and theme system.

## Features

- **GitHub-powered**: Uses GitHub Discussions as backend
- **Theme integration**: Automatically matches light/dark theme
- **Analytics tracking**: Tracks comment section views and interactions
- **Lazy loading**: Comments load when needed for performance
- **Reactions enabled**: Users can react to posts
- **Clean design**: Styled to match site aesthetics

## Configuration

- **Repository**: `nafisazizir/nafisazizi-v4.0`
- **Category**: General discussions
- **Mapping**: Based on pathname
- **Theme**: Auto-switches with site theme
- **Input position**: Bottom of comments

## Components

### Giscus

Core component that handles the GitHub Discussions integration:

- Loads giscus script dynamically
- Handles theme changes automatically
- Configurable options for different use cases

### Comments

Wrapper component providing:

- Section header with icon
- Consistent spacing and design
- Analytics tracking integration
- Clean integration with post content

## Analytics Tracking

- **Comment section views**: Tracks when users scroll to comments
- **Theme compatibility**: Works with existing analytics system
- **Post-specific**: Tracks comments by post title

## Usage

Comments are automatically added to:

- ✅ **Blog posts** - At the bottom of each post
- ✅ **Project pages** - At the bottom of each project
- 🔧 **Customizable** - Can be added to any page

## GitHub Setup Required

1. Repository must be public
2. GitHub Discussions enabled
3. Giscus app installed
4. "General" discussion category exists

## Styling

- Responsive iframe sizing
- Rounded corners to match site design
- Proper spacing and typography
- Theme-aware color scheme

The comments system provides a seamless way for readers to engage with your content while keeping everything connected to your GitHub workflow.
