'use client';

import { SwiperRef } from 'swiper/react';
import { useRef } from 'react';
import { UIContainer, UISwrResource, UISwrResourceProps } from '../components';
import {
  UIViewGrafikInfoWidget,
  UIViewGrafikInfoWidgetProps,
} from '../view/grafik-info';

export type UISwrResourceGrafikInfoWidgetProps<K extends never> = Pick<
  UISwrResourceProps<K>,
  'wrapperComponent' | 'paramsQuery'
> & {
  viewOptions?: Omit<UIViewGrafikInfoWidgetProps, 'items'>;
  pauseOnHover?: boolean;
};

export function UISwrResourceGrafikInfoWidget<K extends never>({
  wrapperComponent,
  pauseOnHover = true,
  paramsQuery,
  viewOptions,
}: UISwrResourceGrafikInfoWidgetProps<K>) {
  const swiperRef = useRef<SwiperRef>(null);
  const loadingComponent = () => (
    <div className="mb-5 bg-base-200 animate-pulse w-full h-[304px] rounded-lg"></div>
  );
  const noItemsComponent = () => (
    <UIContainer>
      <div className="mb-5 bg-base-200 w-full h-[104px] rounded-lg flex justify-center items-center">
        Belum ada data
      </div>
    </UIContainer>
  );
  return (
    <UISwrResource
      resourceKey={'grafik_info'}
      loadingComponent={loadingComponent}
      noItemsComponent={noItemsComponent}
      wrapperComponent={wrapperComponent}
      paramsQuery={paramsQuery}
    >
      {({ data }) => {
        return (
          <div
            className="w-full h-full"
            onMouseOver={() => {
              if (swiperRef.current && pauseOnHover)
                swiperRef.current.swiper.autoplay.pause();
            }}
            onMouseOut={() => {
              if (swiperRef.current && pauseOnHover) {
                swiperRef.current.swiper.autoplay.resume();
              }
            }}
          >
            <UIViewGrafikInfoWidget
              {...viewOptions}
              ref={swiperRef}
              items={data}
            />
          </div>
        );
      }}
    </UISwrResource>
  );
}
