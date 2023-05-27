import {DataListWithMeta, DirectusItemsListType} from "./types";
import {ApiResourceProps} from "./types";
import qs from "qs";
import useSWR from "swr";
import {getResourceApiUrl} from "./server/helpers";

export const resourceSwrFetcher = (key: string) => fetch(key).then((r) => r.json());

export function useResourceSWR<Key extends keyof DirectusItemsListType>
(
  key: Key,
  props: ApiResourceProps<Key> & {
    fetcher?: any
  }
) {
  const {pathQuery, paramsQuery, fetcher} = props
  const pathQueryString = pathQuery?.length
    ? `/${pathQuery?.join('/')}`
    : '';

  const paramsQueryString = paramsQuery
    ? `?${qs.stringify(paramsQuery)}`
    : '';

  return useSWR<DataListWithMeta>(
    `${getResourceApiUrl(key)}${pathQueryString}${paramsQueryString}`,
    fetcher ?? resourceSwrFetcher
  );
}
