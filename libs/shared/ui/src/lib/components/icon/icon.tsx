import {Icon as MainIcon, IconProps as MainIconProps} from '@iconify/react/offline';
import {Icon as MainIconOnline, IconProps as MainIconOnlineProps} from '@iconify/react';

export type IconProps = MainIconProps;
export const UIIcon = ({icon,...props}: IconProps) => {
  return <MainIconOnline icon={icon} {...props} />;
};
export const UIIconOnline = (props: MainIconOnlineProps) => {
  return <MainIconOnline {...props} />;
};
