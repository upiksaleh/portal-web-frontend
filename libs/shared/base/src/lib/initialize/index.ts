import {addAPIProvider, addCollection, disableCache, PartialIconifyAPIConfig} from '@iconify/react';
// import iconsDefault from './icon-collections'

export type InitializePropsType = {
  icons?: {
    useLocal?:true
    APIProviders?: ({ name: string } & PartialIconifyAPIConfig)[]
  }
}
export default function initialize(props: InitializePropsType) {
  const {icons} = props;
  if (process.env.NODE_ENV === 'development') {
    disableCache('all');
  }
  // if(icons && icons.useLocal) {
  //   addCollection(iconsDefault);
  // }
  if(icons && icons.APIProviders){
    for(const i in icons.APIProviders){
      const _c = icons.APIProviders[i];
      addAPIProvider(_c.name, _c);
    }
  }

}
