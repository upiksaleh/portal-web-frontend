import getConfig from 'next/config';
type PublicRuntimeConfig = {
  publicUrl: string;
  cdnBaseUrl: string;
  resourceBaseUrl: string;
  gtmId: string;
};
type ServerRuntimeConfig = {
  directus: {
    url: string;
    staticToken: string;
  };
};
export function getNextConfig() {
  const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
  return { publicRuntimeConfig, serverRuntimeConfig } as {
    publicRuntimeConfig: PublicRuntimeConfig;
    serverRuntimeConfig: ServerRuntimeConfig;
  };
}
