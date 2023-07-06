/* eslint-disable @typescript-eslint/ban-types */
import { FC, ReactNode } from 'react';

export interface IUICreateCustomizableDefine<
  P extends {} = {},
  C extends Record<string, any> = Record<string, any>
> {
  props: P & {
    customizes?: Partial<CustomizeType<IUICreateCustomizableDefine<P, C>>>;
  };
  customizes: C;
  returnType: FC<
    P & {
      customizes?: Partial<CustomizeType<IUICreateCustomizableDefine<P, C>>>;
    }
  >;
  componentType: FC<P & RenderProps<IUICreateCustomizableDefine<P, C>, never>>;
}

type RenderProps<
  D extends IUICreateCustomizableDefine<any, any>,
  Ex extends keyof D['customizes'] // exclude key, untuk mengatasi loop pada fungsi tersebut
> = {
  render<N extends keyof Omit<CustomizeType<D>, Ex>>(
    name: N
  ): ReturnType<CustomizeType<D>[N]>;
  Render: FC<{ name: Omit<KeysOfType<D['customizes'], ReactNode>, Ex> }>;
};

type CustomizeType<D extends IUICreateCustomizableDefine<any, any>> = {
  [key in keyof D['customizes']]: (
    props: D['props'] & RenderProps<D, key>
  ) => D['customizes'][key];
};
type KeysOfType<T, TProp> = {
  [P in keyof T]: T[P] extends TProp ? P : never;
}[keyof T];

export function UICreateCustomizable<
  D extends IUICreateCustomizableDefine<any, any>
>({
  Component,
  defaults,
  props,
}: {
  props: D['props'];
  defaults: CustomizeType<D>;
  Component: D['componentType'];
}) {
  const customizes = { ...defaults, ...(props?.customizes ?? {}) };
  const Render = ({ name }) => {
    const customize = customizes?.[name];
    if (typeof customize === 'function') {
      return customize({ render, Render, ...props });
    }
    return customize;
  };
  const render = (name) => Render({ name });
  return Component({ Render, render, ...props });
}
