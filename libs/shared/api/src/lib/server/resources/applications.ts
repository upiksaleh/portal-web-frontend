import { BaseResourceClass } from '../resource-class';
import { imageFileNormalizer } from '../helpers';
import { STATUS_PUBLISHED } from '../directus';

export class ApplicationsResource extends BaseResourceClass<'applications'> {
  protected item = 'applications';

  config() {
    this.query = {
      fields: [
        'id',
        'link',
        'sort',
        'title',
        'links',
        'social_media',
        'description',
        'slug',
        'logo.*',
        'categories.id',
        'categories.category.id',
        'categories.category.name',
        'organization.id',
        'organization.name',
        'organization.slug',
      ],
      filter: {
        status: STATUS_PUBLISHED
      }
    };
  }

  protected apiByPaths(): Record<string, any> {
    return {
      byCategories: () => {
        if (!this.pathQuery[1]) this.errorThrow('ID Kategori diperlukan');
        const categories = this.pathQuery[1].split('|');
        this.andFilter({
          categories: { category: { id: { _in: categories } } },
        });
      },
    };
  }

  protected normalizer(data: Record<string, any>) {
    data.logo = imageFileNormalizer(data.logo);
    data.categories = (data.categories ?? []).map((c) => c.category);
  }
}
