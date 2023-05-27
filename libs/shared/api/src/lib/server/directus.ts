import getConfig from 'next/config';
import { Directus } from '@directus/sdk';
import { DirectusItemsListType } from '../types';

const { serverRuntimeConfig } = getConfig();

export const STATUS_DRAFT = 'draft';
export const STATUS_PUBLISHED = 'published';
export const STATUS_ARCHIVED = 'archived';

export type DirectusStatusType = 'draft' | 'published' | 'archive';

export const directusInstance = () =>
  new Directus<DirectusItemsListType>(serverRuntimeConfig.directus.url, {
    auth: {
      staticToken: serverRuntimeConfig.directus.staticToken,
    },
  });
