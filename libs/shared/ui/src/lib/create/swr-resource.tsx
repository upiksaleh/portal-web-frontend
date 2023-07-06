/* eslint-disable @typescript-eslint/ban-types */
import {
  ApiResourceProps,
  DirectusItemsListType,
  useResourceSWR,
} from '@portal-web/shared-api';
import { FC } from 'react';
import { SWRResponse } from 'swr';
import { UIViewNewsListItemType } from '../view';

type DefineOptions = {
  /**
   * Resource key yang bisa digunakan.
   * @see {@link DirectusItemsListType}
   * @example
   * ```
   * resourceKey: 'news' // hanya news yang bisa digunakan
   * resourceKey: 'news' | 'web_news' | 'berita'
   * ```
   * */
  resourceKey: keyof DirectusItemsListType;
  props?: {};
};

type ComponentType<D extends DefineOptions> = FC<{
  props: BasePropsDefine<D>;
  /**
   * SWR Response data
   */
  data: SWRResponse['data'];
  swrData: SWRResponse;
}>;

type BasePropsDefine<D extends DefineOptions> = D['props'] &
  ApiResourceProps<any>;

export interface IUICreateSwrResourceDefine<D extends DefineOptions> {
  createProps: {
    props: BasePropsDefine<D>;
    resourceKey: D['resourceKey'];
    LoadingComponent: ComponentType<D>;
    ErrorComponent?: ComponentType<D>;
    EmptyDataComponent?: ComponentType<D>;
    Component: ComponentType<D>;
  };
  returnType: FC<BasePropsDefine<D>>;
}
export function UICreateSwrResource<D extends IUICreateSwrResourceDefine<any>>({
  props,
  resourceKey,
  LoadingComponent,
  ErrorComponent,
  EmptyDataComponent,
  Component,
}: D['createProps']) {
  const swrData = useResourceSWR(resourceKey, {
    paramsQuery: props.paramsQuery,
    pathQuery: props.pathQuery,
  });
  if (swrData.isLoading) {
    return LoadingComponent({ props, data: swrData.data, swrData });
  }
  if (swrData.error && typeof ErrorComponent !== 'undefined') {
    return ErrorComponent({ props, data: swrData.data, swrData });
  }
  if (
    typeof EmptyDataComponent !== 'undefined' &&
    (!swrData.data ||
      (swrData.data && swrData.data.data && !swrData.data.data.length))
  ) {
    return EmptyDataComponent({ props, data: swrData.data, swrData });
  }

  return Component({ props, data: swrData.data, swrData });
}
