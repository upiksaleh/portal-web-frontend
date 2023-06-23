import { BaseResourceClass } from '../resource-class';
import { imageFileNormalizer } from '../helpers';
import { STATUS_PUBLISHED } from '../directus';

export class BannerInfoResource extends BaseResourceClass<'banner_info'> {
  protected item = 'banner_info';

  config() {
    this.query = {
      fields: ['id', 'link', 'sort', 'title', 'image.*'],
      filter: {
        status: STATUS_PUBLISHED
      }
    };
  }

  protected normalizer(data: Record<string, any>) {
    data.image = imageFileNormalizer(data.image);
  }
}
