'use client';

import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';
import {
  Autoplay,
  EffectCoverflow,
  Mousewheel,
  Navigation,
  Pagination,
} from 'swiper';
import { Icon } from '@iconify/react';
import { ComponentPropsWithoutRef, forwardRef, useRef } from 'react';
import clsx from 'clsx';
import { LightGallery } from 'lightgallery/lightgallery';
import { UIViewGrafikInfoInfiLightGallery } from './light-gallery';
import { UINextImageBlur } from '../../components';

export type UIViewGrafikInfoWidgetProps = {
  items: Record<string, any>[];
  slideContainer?: ComponentPropsWithoutRef<'div'>;
  hideAllButton?: boolean;
  noLightGallery?: boolean;
} & SwiperProps;

export const UIViewGrafikInfoWidget = forwardRef<
  SwiperRef,
  UIViewGrafikInfoWidgetProps
>(
  (
    {
      items,
      slideContainer,
      hideAllButton,
      noLightGallery,
      ...props
    }: UIViewGrafikInfoWidgetProps,
    ref
  ) => {
    const lightGalleryRef = useRef<LightGallery | null>(null);
    props.className = clsx(
      'banner__swiper w-full select-none',
      props.className ?? ''
    );
    return (
      <>
        <Swiper
          ref={ref}
          modules={[
            EffectCoverflow,
            Pagination,
            Navigation,
            Autoplay,
            Mousewheel,
          ]}
          slidesPerView={'auto'}
          effect={'coverflow'}
          // grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          speed={750}
          // loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            el: '.banner__swiper-pagination',
            type: 'bullets',
            clickable: true,
          }}
          navigation={{
            nextEl: '.banner__button-next',
            prevEl: '.banner__button-prev',
          }}
          {...props}
        >
          {(items ?? []).map((d, i) => {
            const _Image = () => {
              return (
                <UINextImageBlur
                  src={d.image.url}
                  alt={d.title}
                  title={d.title}
                  width={400}
                  height={600}
                  data-src={d.image.url}
                  className="object-cover w-full h-full"
                  onClick={() => {
                    if (!noLightGallery) {
                      lightGalleryRef.current?.openGallery(i);
                    }
                  }}
                />
              );
            };
            return (
              <SwiperSlide
                key={i}
                data-src={d.image.url}
                className={clsx(
                  // 'w-[400px] h-[600px] object-cover',
                  `!bg-cover !bg-center object-cover`,
                  '!w-[300px] !h-[500px] xl:!w-[400px] xl:!h-[600px]'
                )}
                {...slideContainer}
              >
                {_Image()}
              </SwiperSlide>
            );
          })}
          <div className="banner__swiper-pagination mt-8" />
          <button
            className="hidden md:flex banner__navigation banner__button-prev"
            aria-label="Prev"
          >
            <Icon className={'w-8 h-8'} icon="mdi:chevron-left" />
          </button>
          <button
            className="hidden md:flex banner__navigation banner__button-next"
            aria-label="Next"
          >
            <Icon className={'w-8 h-8'} icon="mdi:chevron-right" />
          </button>
        </Swiper>

        {!hideAllButton && (
          <div className="w-full flex items-center justify-center py-5">
            <a href="/informasi-grafik">
              <button
                className="btn btn-sm btn-outline btn-primary normal-case"
                type="button"
              >
                Lihat Semua
              </button>
            </a>
          </div>
        )}
        {!noLightGallery ? (
          <UIViewGrafikInfoInfiLightGallery
            items={items}
            elementClassNames="hidden"
            onInit={(detail) => {
              lightGalleryRef.current = detail.instance;
            }}
            onAfterOpen={() => {
              if (typeof ref !== 'function') {
                ref?.current?.swiper.autoplay.pause();
              }
            }}
            onAfterClose={() => {
              if (typeof ref !== 'function') {
                if (ref?.current?.swiper.autoplay.paused) {
                  ref?.current?.swiper.autoplay.resume();
                }
              }
            }}
          />
        ) : null}
      </>
    );
  }
);
