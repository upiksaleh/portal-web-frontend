'use client';

import { SwiperRef } from 'swiper/react';
import { UIContainer, UISwrResource, UISwrResourceProps } from '../components';
import { UIViewBannerInfoWidgetProps } from '../view';
import { useRef } from 'react';
import { UIViewBannerInfoWidget } from '../view/banner-info';

export type UISwrResourceBannerInfoWidgetProps<K extends never> = Pick<
  UISwrResourceProps<K>,
  'wrapperComponent'
> & {
  viewOptions?: Omit<UIViewBannerInfoWidgetProps, 'items'>;
  pauseOnHover?: boolean;
};

export function UISwrResourceBannerInfoWidget<K extends never>({
  wrapperComponent,
  pauseOnHover = true,
  viewOptions,
}: UISwrResourceBannerInfoWidgetProps<K>) {
  const swiperRef = useRef<SwiperRef>(null);
  const loadingComponent = () => (
    <div className="mb-5 bg-base-200 animate-pulse w-full h-[304px] rounded-lg"></div>
  );
  const noItemsComponent = () => (
    <UIContainer>
      <div className="mb-5 bg-base-200 w-full h-[104px] rounded-lg flex justify-center items-center">
        Belum ada data banner
      </div>
    </UIContainer>
  );
  return (
    <UISwrResource
      resourceKey={'banner_info'}
      loadingComponent={loadingComponent}
      noItemsComponent={noItemsComponent}
      wrapperComponent={wrapperComponent}
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
            <UIViewBannerInfoWidget
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
