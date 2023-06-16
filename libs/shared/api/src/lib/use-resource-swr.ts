import { DataListWithMeta, DirectusItemsListType } from './types';
import { ApiResourceProps } from './types';
import qs from 'qs';
import useSWR from 'swr';
import { rightTrimSlashes } from '@portal-web/shared-base';

export const resourceSwrFetcher = (key: string) =>
  fetch(key).then((r) => r.json());

export function useResourceSWR<Key extends keyof DirectusItemsListType>(
  key: Key,
  props: ApiResourceProps<Key> & {
    fetcher?: any;
  }
) {
  const { pathQuery, paramsQuery, fetcher } = props;
  const pathQueryString = pathQuery?.length ? `/${pathQuery?.join('/')}` : '';

  const paramsQueryString = paramsQuery ? `?${qs.stringify(paramsQuery)}` : '';
  const baseResourceUrl = rightTrimSlashes(
    process.env.NEXT_PUBLIC_API_RESOURCE_BASE_URL ?? '/api/resources'
  );
  return useSWR<DataListWithMeta>(
    `${baseResourceUrl}/${key}${pathQueryString}${paramsQueryString}`,
    fetcher ?? resourceSwrFetcher
  );
}
