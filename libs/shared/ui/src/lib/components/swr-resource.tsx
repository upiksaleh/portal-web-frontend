import {
  DirectusItemsListType,
  ApiResourceProps,
  useResourceSWR,
} from '@portal-web/shared-api';
import { UISwrComponent, UISwrComponentProps } from './swr-component';

export type UISwrComponentResourceProps<K extends keyof DirectusItemsListType> =
  {
    resourceKey: K;
  } & Omit<UISwrComponentProps, 'swrData'> &
    ApiResourceProps<K>;

export function UISwrResource<K extends keyof DirectusItemsListType>({
  resourceKey,
  children,
  paramsQuery,
  pathQuery,
  ...props
}: UISwrComponentResourceProps<K>) {
  const swrData = useResourceSWR(resourceKey, { pathQuery, paramsQuery });
  return <UISwrComponent {...props} swrData={swrData} children={children} />;
}

// export const UISwrResource: FC<UISwrComponentResourceProps> = ({resourceKey, ...props}) => {
//   const swrData = useResourceSWR(resourceKey, {});
//   return <UISwrComponent {...props} swrData={swrData}/>
// }
