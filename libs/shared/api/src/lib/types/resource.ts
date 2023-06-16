import { DirectusItemsListType } from './directus-items';
import { QueryMany } from '@directus/sdk';

export type ApiResourceProps<CK extends keyof DirectusItemsListType> = {
  pathQuery?: string[];
  paramsQuery?: Pick<
    QueryMany<DirectusItemsListType[CK]>,
    'filter' | 'page' | 'limit' | 'search'
  >;
};
