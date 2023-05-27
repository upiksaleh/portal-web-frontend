import {FileType} from "@directus/sdk";
import getConfig from "next/config";
import {trimSlashes} from "@portal-web/shared-base";
export const urlAssetCdn = (file: FileType | string) => {
  const {publicRuntimeConfig} = getConfig()
  const filename_disk = typeof file === 'string' ? file : file.filename_disk;
  return `${publicRuntimeConfig.CDN_URL}/portal-assets/live/${filename_disk}`;
};

export function getResourceApiUrl(path:string){
  const {publicRuntimeConfig} = getConfig()
  const baseUrl = publicRuntimeConfig.API_RESOURCE_BASE_URL ?? '/api/resources';
  return `${baseUrl}/${trimSlashes(path)}`
}
export const imageFileNormalizer = (data: FileType) => {
  return !data
    ? {}
    : {
      url: urlAssetCdn(data),
      width: data.width,
      height: data.height,
      title: data.title,
      description: data.description,
    };
};

export const fileFileNormalizer = (data: FileType) => {
  return !data
    ? {}
    : {
      url: urlAssetCdn(data),
      title: data.title,
      type: data.type,
      description: data.description,
    };
};
