import { FileType } from '@directus/sdk';
import {
  rightTrimSlashes,
  trimSlashes,
  urlAssetCdn,
} from '@portal-web/shared-base';
export function getResourceApiUrl(path: string) {
  const baseUrl = rightTrimSlashes(
    process.env.NEXT_PUBLIC_API_RESOURCE_BASE_URL ?? '/api/resources'
  );
  return `${baseUrl}/${trimSlashes(path)}`;
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
