import { ComponentProps } from 'react';
import { UIIcon } from '../../components';
import Image from 'next/image';

export type UIViewApplicationItemLogoProps = {
  data: Record<string, any>;
} & Omit<ComponentProps<'div'>, 'children'>;
export function UIViewApplicationItemLogo({
  data,
  ...props
}: UIViewApplicationItemLogoProps) {
  return (
    <div {...props}>
      {data.logo && data.logo.url ? (
        <Image
          src={data.logo.url}
          width={50}
          height={50}
          alt={`Logo ${data.slug}`}
          className="w-full"
        />
      ) : (
        <UIIcon
          icon="carbon:application"
          className="text-primary"
          width={48}
          height={48}
        />
      )}
    </div>
  );
}
