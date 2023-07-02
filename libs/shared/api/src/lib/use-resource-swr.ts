import { DataListWithMeta, DirectusItemsListType } from './types';
import { ApiResourceProps } from './types';
import qs from 'qs';
import useSWR from 'swr';
import { getNextConfig, rightTrimSlashes } from '@portal-web/shared-base';

const pathQueryStringBuild = (pathQuery) => {
  return pathQuery?.length ? `/${pathQuery?.join('/')}` : '';
};
const paramsQueryStringBuild = (paramsQuery) => {
  return paramsQuery ? `?${qs.stringify(paramsQuery)}` : '';
};

export const resourceUrlKeyBuild = <Key extends keyof DirectusItemsListType>({
  key,
  pathQuery,
  paramsQuery,
}: { key: Key } & ApiResourceProps<Key>) => {
  const { publicRuntimeConfig } = getNextConfig();
  const baseResourceUrl = rightTrimSlashes(publicRuntimeConfig.resourceBaseUrl);
  return `${baseResourceUrl}/${key}${pathQueryStringBuild(
    pathQuery
  )}${paramsQueryStringBuild(paramsQuery)}`;
};

export const resourceSwrFetcher = (key: string) =>
  fetch(key).then((r) => r.json());

export function useResourceSWR<Key extends keyof DirectusItemsListType>(
  key: Key,
  props: ApiResourceProps<Key> & {
    fetcher?: any;
  }
) {
  const { pathQuery, paramsQuery, fetcher } = props;
  return useSWR<DataListWithMeta>(
    resourceUrlKeyBuild({ key, pathQuery, paramsQuery }),
    fetcher ?? resourceSwrFetcher
  );
}
