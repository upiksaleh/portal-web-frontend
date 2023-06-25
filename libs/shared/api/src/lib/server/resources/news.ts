import { BaseResourceClass } from '../resource-class';
import { imageFileNormalizer } from '../helpers';
import { dateUtils } from '@portal-web/shared-base';
import { STATUS_PUBLISHED } from '../directus';

export class NewsResource extends BaseResourceClass<'news'> {
  protected item = 'news';

  // protected key = 'news';

  config() {
    this.query = {
      meta: '*',
      limit: 10,
      page: 1,
      sort: ['-publish_date'],
      filter: {
        status: {
          _eq: STATUS_PUBLISHED,
        },
      },
      fields: [
        'id',
        'title',
        'description',
        'slug',
        'publish_date',
        'date_updated',
        'reporter',
        'image_cover.*',
        'category.id',
        'category.name',
        'category.slug',
        'user_created.*',
        'view_count',
        'shared_count',
      ],
    };
  }

  apiByPaths() {
    const query = this.query;
    return {
      latest() {
        query.sort = ['-publish_date'];
      },
      popular() {
        query.sort = ['-view_count'];
      },
      bySlug: () => {
        if (!this.pathQuery[1]) this.errorThrow('Slug diperlukan');
        this.paramsQueryProcess = false;
        this.addField(['content']);
        this.query.limit = 1;
        this.type = 'item';
        this.andFilter({
          slug: { _eq: this.pathQuery[1] },
        });
      },
      byCategorySlug: () => {
        if (!this.pathQuery[1]) this.errorThrow('Slug Kategori diperlukan');
        this.andFilter({
          category: {
            slug: {
              _eq: this.pathQuery[1],
            },
          },
        });
      },
      byCategorySlugPopular: () => {
        if (!this.pathQuery[1]) this.errorThrow('Slug Kategori diperlukan');
        query.sort = ['-view_count'];
        this.andFilter({
          category: {
            slug: {
              _eq: this.pathQuery[1],
            },
          },
        });
      },
      byCategoryName: () => {
        if (!this.pathQuery[1]) this.errorThrow('Nama Kategori diperlukan');
        this.andFilter({
          category: {
            name: {
              _eq: this.pathQuery[1],
            },
          },
        });
      },
      shared: async () => {
        if (!this.pathQuery[1]) this.errorThrow('ID diperlukan');
        this.query.fields = ['shared_count'];
        this.andFilter({ id: { _eq: this.pathQuery[1] } });

        return async ({ data }) => {
          if (!data.length) this.errorThrow('tidak ditemukan');
          const _data = data[0];
          const shared_count = (_data.shared_count ?? 0) + 1;
          await this.itemsHandler().updateOne(this.pathQuery[1], {
            shared_count,
          });
          return {
            success: true,
            shared_count,
          };
        };
      },
    };
  }

  normalizerFields() {
    return {
      reporter: (value, d) => {
        return (
          value ??
          d.user_created.content_author_name ??
          `${d.user_created.first_name} ${d.user_created.last_name}`
        );
      },
    };
  }

  protected normalizer(data: Record<string, any>) {
    data.writer =
      data.user_created.content_author_name ??
      `${data.user_created.first_name} ${data.user_created.last_name}`;
    data.image_cover = imageFileNormalizer(data.image_cover);
    data.publish_date_format = dateUtils.format(data.publish_date, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    delete data.user_created;
    // delete data.image_cover
  }
}
