import { BaseResourceClass } from '../resource-class';
import { STATUS_PUBLISHED } from '../directus';

export class WebsitesResource extends BaseResourceClass<'websites'> {
  protected item = 'websites';

  config() {
    this.query = {
      filter: {
        status: { _eq: STATUS_PUBLISHED },
      },
      fields: [
        'id',
        'domain',
        'slug',
        'name',
        'domain_alias',
        'organization.id',
        'organization.name',
        'organization.slug',
        'organization.email',
        'organization.phone',
        'organization.address',
        'organization.location_point',
        'organization.social_media',
      ],
    };
  }

  protected apiByPaths(): Record<string, any> {
    return {
      byDomain: () => {
        if (!this.pathQuery[1]) this.errorThrow('Domain diperlukan');
        this.andFilter({ domain: { _eq: this.pathQuery[1] } });
        this.query.limit = 1;
        this.type = 'item';
      },
      byDomainOrAlias: () => {
        if (!this.pathQuery[1]) this.errorThrow('Domain diperlukan');
        this.andFilter({
          _or: [
            { domain: { _eq: this.pathQuery[1] } },
            { domain_alias: { _contains: this.pathQuery[1] } },
          ],
        });
        this.query.limit = 1;
        this.type = 'item';
      },
    };
  }

  normalizerFields() {
    return {
      domain_alias: (value, d) => {
        return value ? value.split('\n') : [];
      },
    };
  }
}
