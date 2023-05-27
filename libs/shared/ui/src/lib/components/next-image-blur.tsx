import Image from 'next/image';
import { useState } from 'react';
import { ImageProps } from 'next/dist/client/image';
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
        !loaded ? 'bg-gray-200 animate-pulse blur-sm' : 'blur-none'
      )}
      onLoadingComplete={() =>
        setTimeout(() => {
          setLoaded(true);
          if (props.loadingComplete) props.loadingComplete();
        }, props.timeout ?? 1000)
      }
    />
  );
};

