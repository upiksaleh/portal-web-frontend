import { PartialIconifyAPIConfig } from '@iconify/react';
import { FC, ReactElement, createContext, useContext, useState } from 'react';
import initialize from './initialize';
import { trimSlashes } from '../utils';

export type InitializeContextType = {
  config: {
    publicUrl: string;
    icons?: {
      useLocal?: true;
      APIProviders?: ({ name: string } & PartialIconifyAPIConfig)[];
    };
  };
  changeConfig(config: InitializeContextType['config']): void;
  getPublicUrl(path: string | null): string;
};

export const InitilializeContext = createContext<InitializeContextType | null>(
  null
);

export const InitializeProvider: FC<{
  config: InitializeContextType['config'];
  children: ReactElement;
}> = ({ config: initialConfig, children }) => {
  const [config, setConfig] =
    useState<InitializeContextType['config']>(initialConfig);

  initialize(initialConfig);

  const changeConfig: InitializeContextType['changeConfig'] = (_config) => {
    setConfig({ ...config, ..._config });
  };
  const getPublicUrl: InitializeContextType['getPublicUrl'] = (path) => {
    return [trimSlashes(config.publicUrl), path ?? ''].join('');
  };
  return (
    <InitilializeContext.Provider
      value={{ config: config, changeConfig, getPublicUrl }}
    >
      {children}
    </InitilializeContext.Provider>
  );
};

export function useInitializeContext() {
  return useContext(InitilializeContext) as InitializeContextType;
}

// config value
export function useInitializeContextConfigValue() {
  return useInitializeContext().config;
}
