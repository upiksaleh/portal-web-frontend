import { Autoplay, Mousewheel, Navigation, Pagination } from 'swiper';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { forwardRef } from 'react';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';

export type UIViewApplicationListWidgetProps = {
  items: Record<string, any>;
} & SwiperProps;
export const UIViewApplicationListWidget = forwardRef<
  SwiperRef,
  UIViewApplicationListWidgetProps
>(({ items, ...props }, ref) => {
  return (
    <Swiper
      ref={ref}
      modules={[Pagination, Navigation, Mousewheel, Autoplay]}
      slidesPerView={1}
      spaceBetween={0}
      slidesPerGroup={1}
      // loop
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      }}
      breakpoints={{
        640: {
          speed: 750,
          slidesPerView: 2.3,
          slidesPerGroup: 2.3,
          spaceBetween: 16,
        },
        1280: {
          speed: 750,
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 16,
        },
      }}
      passiveListeners={true}
      mousewheel={true}
      className="application-list-widget-swiper"
      {...props}
    >
      {items.map((item, i) => (
        <SwiperSlide key={i}>
          <div
            className="h-[230px] md:h-[220px] flex flex-col gap-2 group
    bg-white p-6 overflow-y-auto rounded-xl border border-white hover:border-primary-700 hover:shadow transition-colors ease-brand duration-250"
          >
            <div className="">
              <span
                className="inline-block rounded-md px-2 py-1 text-xs font-semibold text-gray-700 bg-primary-50
group-hover:text-primary-700 group-hover:bg-primary-200"
              >
                {item.slug}
              </span>
            </div>

            <div>
              <div className="font-lato font-bold text-sm text-blue-gray-800 leading-1 md:text-base line-clamp-2">
                {item.title}
              </div>
            </div>
            <p className="font-lato text-sm font-normal text-[#415C84] leading-5 line-clamp-3 md:line-clamp-2">
              {item.description}
            </p>
            {item.link ? (
              <div className="flex-1 flex items-end">
                <Link
                  href={item.link}
                  target="_blank"
                  className="inline-flex bg-primary lg:bg-primary/80 lg:group-hover:bg-primary text-sm text-white rounded-lg px-3 py-1 items-center gap-4"
                >
                  Buka Aplikasi <Icon icon="mdi:external-link" />
                </Link>
              </div>
            ) : null}
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination navigation__wrapper mt-8" />
      <div className="">
        <button
          className="swiper-button-prev
    transition-all ease-brand duration-300"
          aria-label="Prev"
        >
          <Icon className={'w-8 h-8'} icon="mdi:chevron-left" />
        </button>
        <button
          className="swiper-button-next
    transition-all ease-brand duration-300"
          aria-label="Next"
        >
          <Icon className={'w-8 h-8'} icon="mdi:chevron-right" />
        </button>
      </div>
    </Swiper>
  );
});
