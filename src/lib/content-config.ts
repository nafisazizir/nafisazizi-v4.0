// src/lib/content-config.ts

import { ContentConfig, ContentType } from '@/types/content';

export function getContentConfig(type: ContentType): ContentConfig {
  switch (type) {
    case 'blog':
      return {
        contentType: 'blog',
        basePath: '/blog',
        singular: 'post',
        plural: 'posts',
      };
    case 'project':
      return {
        contentType: 'project',
        basePath: '/projects',
        singular: 'project',
        plural: 'projects',
      };
    default:
      throw new Error(`Unsupported content type: ${type}`);
  }
}
