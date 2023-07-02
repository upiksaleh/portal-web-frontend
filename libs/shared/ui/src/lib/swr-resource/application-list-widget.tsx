import { SwiperRef } from 'swiper/react';
import { useRef } from 'react';
import { UISwrResource, UISwrResourceProps } from '../components';
import {
  UIViewApplicationListWidget,
  UIViewApplicationListWidgetProps,
} from '../view/application';

export type UISwrResourceApplicationListWidgetProps<K extends never> = Pick<
  UISwrResourceProps<K>,
  'wrapperComponent'
> & {
  viewOptions?: Omit<UIViewApplicationListWidgetProps, 'items'>;
  pauseOnHover?: boolean;
};

export function UISwrResourceApplicationListWidget<K extends never>({
  viewOptions,
  pauseOnHover = true,
  ...props
}: UISwrResourceApplicationListWidgetProps<K>) {
  const swiperRef = useRef<SwiperRef>(null);
  return (
    <UISwrResource
      resourceKey={'applications'}
      loadingComponent={() => (
        <div className="h-[230px] md:h-[220px] bg-base-200 animate-pulse rounded-lg p-5">
          <div className="flex justify-between h-full gap-3">
            <div className="bg-white w-full p-5">
              <div className="bg-base-200 animate-pulse w-5/12 h-3 mb-6"></div>
              <div className="bg-base-200 animate-pulse h-5 mb-3"></div>
              <div className="bg-base-200 animate-pulse h-5"></div>
            </div>
            <div className="bg-white w-full p-5">
              <div className="bg-base-200 animate-pulse w-5/12 h-3 mb-6"></div>
              <div className="bg-base-200 animate-pulse h-5 mb-3"></div>
              <div className="bg-base-200 animate-pulse h-5"></div>
            </div>
            <div className="bg-white w-full p-5">
              <div className="bg-base-200 animate-pulse w-5/12 h-3 mb-6"></div>
              <div className="bg-base-200 animate-pulse h-5 mb-3"></div>
              <div className="bg-base-200 animate-pulse h-5"></div>
            </div>
          </div>
        </div>
      )}
      noItemsComponent={() => (
        <div className="mb-5 bg-base-200 w-full h-[104px] rounded-lg flex justify-center items-center">
          Belum ada data aplikasi
        </div>
      )}
      paramsQuery={{ limit: 10 }}
      {...props}
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
            <UIViewApplicationListWidget
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
