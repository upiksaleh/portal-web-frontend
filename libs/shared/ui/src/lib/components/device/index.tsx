import dynamic from 'next/dynamic';
import { UIIcon } from '../icon/icon';

export const UIDevice = dynamic(() => import('./device'), {
  ssr: false,
  loading: () => (
    <UIIcon
      icon="base:loading"
      className="animate-spin text-primary-base stroke-2 fill-amber-200"
      width={50}
    />
  ),
});
