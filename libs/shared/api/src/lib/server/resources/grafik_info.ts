import { BaseResourceClass } from '../resource-class';
import { imageFileNormalizer } from '../helpers';
import { STATUS_PUBLISHED } from '../directus';

export class GrafikInfoResource extends BaseResourceClass<'grafik_info'> {
  protected item = 'grafik_info';

  config() {
    this.query = {
      fields: ['id', 'publish_date', 'title', 'image.*'],
      sort: ['-publish_date'],
      filter: {
        status: STATUS_PUBLISHED,
      },
    };
  }
  protected normalizer(data: Record<string, any>) {
    data.image = imageFileNormalizer(data.image);
  }
}
