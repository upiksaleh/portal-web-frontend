import { Directus } from '@directus/sdk';
import { DirectusItemsListType } from '../types';

export const STATUS_DRAFT = 'draft';
export const STATUS_PUBLISHED = 'published';
export const STATUS_ARCHIVED = 'archived';

export type DirectusStatusType = 'draft' | 'published' | 'archive';

export const directusInstance = () => {
  if (!process.env.BACKEND_URL) throw Error('env BACKEND_URL perlu diset');
  return new Directus<DirectusItemsListType>(process.env.BACKEND_URL, {
    auth: {
      staticToken: process.env.BACKEND_TOKEN,
    },
  });
};
