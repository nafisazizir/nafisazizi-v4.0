// src/lib/notion/utils.ts

import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { NotionPage } from './types';

export function isFullPage(response: any): response is PageObjectResponse {
  return 'properties' in response;
}

export function getRichTextContent(richText: any[]): string {
  if (!richText?.length) return '';
  return richText.map((text: any) => text.plain_text).join('');
}

export function getSelectContent(select: any): string {
  return select?.name || '';
}

export function getMultiSelectContent(multiSelect: any[]): string[] {
  if (!multiSelect?.length) return [];
  return multiSelect.map((item: any) => item.name);
}

export function getDateContent(date: any): string | null {
  return date?.start || null;
}

export function getFormulaContent(formula: any): string {
  if (!formula) return '';
  
  switch (formula.type) {
    case 'string':
      return formula.string || '';
    case 'number':
      return formula.number?.toString() || '';
    case 'boolean':
      return formula.boolean?.toString() || '';
    case 'date':
      return formula.date?.start || '';
    default:
      return '';
  }
}

export function normalizeContent(content: string | undefined): string {
  if (content === undefined) {
    return '';
  }

  return content
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
    .replace(/\n(#{1,6}.*)\n/g, '\n\n$1\n\n') // Add spacing around headers
    .replace(/\n([*-].*)\n/g, '\n\n$1\n') // Add spacing around lists
    .trim();
}

export function createSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown formatting and get plain text
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}
