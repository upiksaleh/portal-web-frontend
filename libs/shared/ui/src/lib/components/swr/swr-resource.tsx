import {
  DirectusItemsListType,
  ApiResourceProps,
  useResourceSWR,
} from '@portal-web/shared-api';
import { UISwrComponent, UISwrComponentProps } from './swr-component';

export type UISwrComponentResourceProps<K extends keyof DirectusItemsListType> =
  UISwrResourceProps<K>;

export type UISwrResourceProps<K extends keyof DirectusItemsListType> = {
  resourceKey: K;
} & Omit<UISwrComponentProps, 'swrData'> &
  ApiResourceProps<K>;

export function UISwrResource<K extends keyof DirectusItemsListType>({
  resourceKey,
  children,
  paramsQuery,
  pathQuery,
  ...props
}: UISwrResourceProps<K>) {
  const swrData = useResourceSWR(resourceKey, { pathQuery, paramsQuery });
  return <UISwrComponent {...props} swrData={swrData} children={children} />;
}
