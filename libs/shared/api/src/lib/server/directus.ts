import { Directus } from '@directus/sdk';
import { DirectusItemsListType } from '../types';
import { getNextConfig } from '@portal-web/shared-base';

export const STATUS_DRAFT = 'draft';
export const STATUS_PUBLISHED = 'published';
export const STATUS_ARCHIVED = 'archived';

export type DirectusStatusType = 'draft' | 'published' | 'archive';

export const directusInstance = () => {
  const { serverRuntimeConfig } = getNextConfig();
  return new Directus<DirectusItemsListType>(serverRuntimeConfig.directus.url, {
    auth: {
      staticToken: serverRuntimeConfig.directus.staticToken,
    },
  });
};
