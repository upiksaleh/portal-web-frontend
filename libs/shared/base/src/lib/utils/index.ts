export function trimSlashes(str) {
  return str.replace(/^\/|\/$/g, '');
}

export function rightTrimSlashes(str) {
  return str.replace(/\/$/, '');
}

export * as dateUtils from './date';
export * from './next-image-url';
