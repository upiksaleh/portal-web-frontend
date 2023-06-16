import React, { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
interface BaseContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export const UIContainer = forwardRef<HTMLDivElement, BaseContainerProps>(
  (props, ref): JSX.Element => (
    <div className={clsx('ui-container', props.className)} ref={ref}>
      {props.children}
    </div>
  )
);
