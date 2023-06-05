import Image from 'next/image';
import {useState} from 'react';
import {ImageProps} from 'next/dist/client/image';
import clsx from 'clsx';

export const UINextImageBlur = (
  props: ImageProps & { timeout?: number; loadingComplete?: () => void }
) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      className={clsx(
        props.className,
        'duration-700 ease-in-out',
        !loaded ? 'blur-xl min-h-[20rem] bg-base-200 w-full' : 'blur-none'
      )}
      onLoadingComplete={() => {
        setLoaded(true);
        if (props.loadingComplete) props.loadingComplete();
      }}
    />
  );
};

