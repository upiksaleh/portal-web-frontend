import { FileType } from '@directus/sdk';
import { rightTrimSlashes, trimSlashes } from '@portal-web/shared-base';
export const urlAssetCdn = (file: FileType | string) => {
  const filename_disk =
    typeof file === 'string'
      ? file
      : file.filename_disk ?? `${file.fileId}.${file.extension}`;
  return `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/portal-assets/live/${filename_disk}`;
};

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
