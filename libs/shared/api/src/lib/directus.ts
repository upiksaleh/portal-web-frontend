import getConfig from 'next/config';
import { Directus } from '@directus/sdk';
import { DirectusItemsListType } from './types';

const { publicRuntimeConfig } = getConfig();

export const directusInstancePublic = () =>
  new Directus<DirectusItemsListType>(publicRuntimeConfig.backendUrl);

