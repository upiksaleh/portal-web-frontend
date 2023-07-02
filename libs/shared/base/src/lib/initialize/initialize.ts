import { addAPIProvider, disableCache } from '@iconify/react';
import { InitializeContextType } from './context';
// import iconsDefault from './icon-collections'

export default function initialize(props: InitializeContextType['config']) {
  const { icons } = props;
  if (process.env.NODE_ENV === 'development') {
    disableCache('all');
  }
  // if(icons && icons.useLocal) {
  //   addCollection(iconsDefault);
  // }
  if (icons && icons.APIProviders) {
    for (const i in icons.APIProviders) {
      const _c = icons.APIProviders[i];
      addAPIProvider(_c.name, _c);
    }
  }
}
