import {BaseResourceClass} from "../resource-class";
import {fileFileNormalizer} from "../helpers";
import {dateUtils} from "@portal-web/shared-base";

export class DocumentsResource extends BaseResourceClass<'documents'> {
  protected item = "documents";

  config() {
    this.query = {
      fields: [
        'id', 'description', 'publish_date', 'title', 'category.id', 'category.name', 'file.*','date_updated'
      ],
      limit: 5,
      sort:['-publish_date']
    }
  }

  protected apiByPaths(): Record<string, any> {
    return {
      byCategoryId: () => {
        if (!this.pathQuery[1]) this.errorThrow('ID Kategori diperlukan')
        this.andFilter({category: {_eq: this.pathQuery[1]}})
      }
    }
  }

  protected normalizer(data: Record<string, any>) {
    data.file = fileFileNormalizer(data.file);
    data.publish_date_format = dateUtils.format(data.publish_date, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    data.date_updated_format = data.date_updated ? dateUtils.format(data.date_updated, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) : null;
  }

}
