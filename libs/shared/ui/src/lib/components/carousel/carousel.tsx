import {
  FC,
  Fragment,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';
import {Transition} from '@headlessui/react';
import {UINextImageBlur} from '../next-image-blur';

export type UICarouselContentComponent = FC<{
  next(): void;
  prev(): void;
  item: Record<string, any>;
  currentIndex: number;
  items: Record<string, any>[];
  setCurrentIndex: (index: number) => void;
}>;
export interface UICarouselProps {
  items: ({ image: string } & Record<string, any>)[];
  content?: UICarouselContentComponent;
  filter?: any;
  hoverAnimate?: boolean;
  duration?: number;
  pauseOnHover?: boolean;
  autoPlay?: boolean;
}
export type UICarouselOptionsProps = Omit<UICarouselProps, 'items'>


export function UICarousel(
  {
    items,
    filter,
    content,
    hoverAnimate = false,
    duration = 3000,
    pauseOnHover = false,
    autoPlay = true,
  }: UICarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const next = () => {
    setCurrentIndex(currentIndex >= items.length - 1 ? 0 : currentIndex + 1);
  };
  const prev = () => {
    setCurrentIndex(currentIndex <= 0 ? items.length - 1 : currentIndex - 1);
  };
  const onMouseOver = () => {
    if (pauseOnHover) {
      setPause(true);
    }
  };
  const onMouseOut = () => {
    if (pauseOnHover) {
      setPause(false);
    }
  };
  useEffect(() => {
    const _interval = setInterval(() => {
      if (!pause && autoPlay) {
        next();
      }
    }, duration);
    return () => clearInterval(_interval);
  }, [currentIndex, pause]);
  return (
      <div
        className={clsx('ui-carousel w-full h-full overflow-hidden relative', {
          'group': hoverAnimate,
        })}
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
              <UINextImageBlur
                timeout={0}
                quality={100}
                sizes="100%"
                fill
                src={item.image}
                alt={''}
                className={clsx(
                  'carousel-bg bg-no-repeat object-cover bg-cover bg-center w-full h-full',
                  {
                    'transition duration-500 ease-in-out group-hover:transform group-hover:scale-110':
                    hoverAnimate,
                  }
                )}
              />
              {filter && filter()}
              {content &&
                content({
                  next,
                  prev,
                  item,
                  currentIndex: index,
                  items,
                  setCurrentIndex,
                })}
            </div>
          </Transition>
        ))}
      </div>
  );
}

