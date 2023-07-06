import { FC, Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import { UINextImageBlur } from '../next-image-blur';
import {
  IUICreateCustomizableDefine,
  UICreateCustomizable,
} from '../../create';

export type UICarouselComponentType = FC<{
  next(): void;
  prev(): void;
  item: Record<string, any>;
  currentIndex: number;
  items: Record<string, any>[];
  setCurrentIndex: (index: number) => void;
}>;

export type UICarouselType = IUICreateCustomizableDefine<
  {
    items: ({ image: string } & Record<string, any>)[];
  },
  {
    pauseOnHover: boolean;
    autoPlay: boolean;
    hoverAnimate: boolean;
    FilterComponent: UICarouselComponentType;
    ImageComponent: UICarouselComponentType;
    ContentComponent: UICarouselComponentType;
    duration: number;
  }
>;
export const UICarousel: UICarouselType['returnType'] = (props) => {
  return UICreateCustomizable<UICarouselType>({
    props,
    defaults: {
      autoPlay: () => true,
      pauseOnHover: () => true,
      duration: () => 3 * 1000,
      hoverAnimate: () => false,
      FilterComponent({ render }) {
        return () => (
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(56.33% 56.33% at 50.59% 43.67%, rgba(0, 23, 28, 0.5) 0%, rgba(0, 11, 14, 0.7) 46.15%, rgba(0, 11, 14, 0.82) 100%)',
            }}
          />
        );
      },
      ImageComponent({ render }) {
        return ({ item }) => (
          <UINextImageBlur
            timeout={0}
            sizes="100%"
            fill
            src={item.image}
            alt={''}
            className={clsx(
              'carousel-bg bg-no-repeat object-cover bg-cover bg-center w-full h-full'
            )}
          />
        );
      },
      ContentComponent() {
        return () => <div></div>;
      },
    },
    Component: ({ items, render, Render }) => {
      const [currentIndex, setCurrentIndex] = useState(0);
      const [pause, setPause] = useState(false);
      const next = () => {
        setCurrentIndex(
          currentIndex >= items.length - 1 ? 0 : currentIndex + 1
        );
      };
      const prev = () => {
        setCurrentIndex(
          currentIndex <= 0 ? items.length - 1 : currentIndex - 1
        );
      };
      const onMouseOver = () => {
        if (render('pauseOnHover')) {
          setPause(true);
        }
      };
      const onMouseOut = () => {
        if (render('pauseOnHover')) {
          setPause(false);
        }
      };
      useEffect(() => {
        const _interval = setInterval(() => {
          if (!pause && render('autoPlay')) {
            next();
          }
        }, render('duration'));
        return () => clearInterval(_interval);
      }, [currentIndex, pause]);

      const callComponent = (item: any, c: UICarouselComponentType) =>
        c({ currentIndex, item, items, next, prev, setCurrentIndex });

      return (
        <div
          className={clsx(
            'ui-carousel w-full h-full overflow-hidden relative',
            {
              group: render('hoverAnimate'),
            }
          )}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          {items.map((item, index) => (
            <Transition
              key={index}
              as={Fragment}
              enter="transition-all ease duration-[0.9s] overflow-hidden absolute"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              entered="overflow-hidden absolute"
              leave="transition-all ease duration-[0.9s] overflow-hidden absolute"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={currentIndex === index}
            >
              <div className={'w-full h-full'}>
                {callComponent(item, render('ImageComponent'))}
                {callComponent(item, render('FilterComponent'))}
                {callComponent(item, render('ContentComponent'))}
              </div>
            </Transition>
          ))}
        </div>
      );
    },
  });
};
