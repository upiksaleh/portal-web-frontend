import { FC, ReactElement } from 'react';
import { SWRResponse } from 'swr';

export type UISwrComponentProps = {
  loadingComponent: (data: SWRResponse) => ReactElement;
  noItemsComponent: (data: SWRResponse) => ReactElement;
  wrapperComponent?: ({
    children,
    ...data
  }: { children: any } & SWRResponse) => ReactElement;
  swrData: SWRResponse;
  preProcess?: (data: SWRResponse) => void;
  children: (data: SWRResponse['data'], swrData: SWRResponse) => ReactElement;
};

export type UISwrComponentFCProps<P> = FC<
  {
    loadingComponent?: (data: SWRResponse) => ReactElement;
    noItemsComponent?: (data: SWRResponse) => ReactElement;
  } & P
>;

//===============================================================
export const UISwrComponent: FC<UISwrComponentProps> = ({
  loadingComponent,
  noItemsComponent,
  wrapperComponent,
  swrData,
  preProcess,
  children,
}) => {
  const wrapper = (children): any => {
    if (wrapperComponent) return wrapperComponent({ children, ...swrData });
    return children;
  };
  if (swrData.isLoading) return wrapper(loadingComponent(swrData));
  if (!swrData.data.data || (swrData.data.data && !swrData.data.data.length))
    return wrapper(noItemsComponent(swrData));

  if (preProcess) preProcess(swrData);

  return wrapper(children(swrData.data, swrData));
};
