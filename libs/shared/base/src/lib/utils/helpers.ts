import { FileType } from '@directus/sdk';
import { getNextConfig } from './next-config';

export function trimSlashes(str: string) {
  return str.replace(/^\/|\/$/g, '');
}

export function rightTrimSlashes(str: string) {
  return str.replace(/\/$/, '');
}

export const urlAssetCdn = (file: FileType | string) => {
  const { publicRuntimeConfig } = getNextConfig();
  const filename_disk =
    typeof file === 'string'
      ? file
      : file.filename_disk ?? `${file.fileId}.${file.extension}`;
  return `${rightTrimSlashes(publicRuntimeConfig.cdnBaseUrl)}/${filename_disk}`;
};

export function publicUrl(path: string | null) {
  const { publicRuntimeConfig } = getNextConfig();
  return [publicRuntimeConfig.publicUrl, path ?? ''].join('');
}

export const documentIcon = (mimeType: string) => {
  switch (mimeType) {
    case 'application/pdf':
      return '/icons/document/pdf.svg';

    case 'application/msword':
      return '/icons/document/doc.svg';

    case 'application/vnd.ms-excel':
      return '/icons/document/xls.svg';

    default:
      return '/icons/document/pdf.svg';
  }
};

export function mimeTypeLabel(mimeType: string) {
  switch (mimeType) {
    case 'application/pdf':
      return 'Portable Document Format (PDF)';

    case 'application/msword':
      return 'Microsoft Word';

    case 'application/vnd.ms-excel':
      return 'Microsoft Excel';

    default:
      return '-';
  }
}
// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
export function humanFileSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + ' ' + units[u];
}
