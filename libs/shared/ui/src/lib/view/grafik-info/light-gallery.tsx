import { GalleryItem } from 'lightgallery/lg-utils';
import { LightGalleryProps } from 'lightgallery/react';
import { nextImageUrl } from '@portal-web/shared-base';
import { UILightGallery } from '../../components';
export type UIViewGrafikInfoInfiLightGalleryProps = {
  items: Record<string, any>[];
  itemExtend?: (item) => GalleryItem;
} & LightGalleryProps;
export function UIViewGrafikInfoInfiLightGallery({
  items,
  itemExtend,
  ...props
}: UIViewGrafikInfoInfiLightGalleryProps) {
  return (
    <UILightGallery
      {...props}
      dynamic
      dynamicEl={items.map((item, index) => {
        const extend = itemExtend ? itemExtend(item) : {};
        return {
          src: item.image.url,
          thumb: nextImageUrl({
            url: item.image.url,
            width: 128,
            quality: 75,
          }),
          subHtml: item.title,
          ...extend,
        };
      })}
    />
  );
}
