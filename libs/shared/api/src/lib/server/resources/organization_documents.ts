import { BaseResourceClass } from '../resource-class';
import { fileFileNormalizer, imageFileNormalizer } from '../helpers';
import { STATUS_PUBLISHED } from '../directus';
import { dateUtils } from '@portal-web/shared-base';

export class OrganizationDocumentsResource extends BaseResourceClass<'organization_documents'> {
  protected item = 'organization_documents';

  config() {
    this.query = {
      filter: {
        status: { _eq: STATUS_PUBLISHED },
      },
      sort: ['-publish_date', '-date_updated'],
      fields: [
        'id',
        'publish_date',
        'date_updated',
        'title',
        'description',
        'file.*',
        'category',
        'organization.id',
        'organization.name',
        'organization.slug',
      ],
    };
  }

  protected normalizerFields(): Record<string, any> {
    return {
      file: (value) => (value ? fileFileNormalizer(value) : null),
    };
  }

  protected normalizer(data: Record<string, any>) {
    data.publish_date_format = data.publish_date
      ? dateUtils.format(data.publish_date, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : null;
    data.date_updated_format = data.date_updated
      ? dateUtils.format(data.date_updated, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : null;
  }

  protected apiByPaths(): Record<string, any> {
    return {
      byOrganizationId: () => {
        if (!this.pathQuery[1]) this.errorThrow('ID Organisasi diperlukan');
        this.query.limit = -1;
        this.andFilter({ organization: { id: { _eq: this.pathQuery[1] } } });
      },
    };
  }
}
