import {createContext, FC, ReactElement, useContext, useState} from "react";

import initialize, {InitializePropsType} from '@portal-web/shared-base/initialize';

type AddConfigObject = {
  key: string
  value: any
};
export type UIConfigContextState = {
  config: InitializePropsType;
  addConfig: (prevConfig: any, config: AddConfigObject) => void;
};

const contextDefaultValues: UIConfigContextState = {
  config: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addConfig: () => {
  }
};
export const UIConfigContext = createContext<UIConfigContextState>(
  contextDefaultValues
);
type ProviderProps = {
  config: UIConfigContextState['config'],
  children: ReactElement
}
export const UIConfigProvider: FC<ProviderProps> = ({config: initialConfig, children}) => {
  const [config, setConfig] = useState<any>(initialConfig);
  initialize(initialConfig);

  const addConfig = (prevConfig: any, newConfig: AddConfigObject) => {
    prevConfig[newConfig.key] = newConfig.value;
    setConfig(prevConfig);
  }
  return (
    <UIConfigContext.Provider value={{config: config, addConfig}}>
      {children}
    </UIConfigContext.Provider>
  );
};


export function useUIConfigContext() {
  return useContext(UIConfigContext);
}
