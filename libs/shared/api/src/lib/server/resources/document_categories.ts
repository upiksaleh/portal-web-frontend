import { BaseResourceClass } from '../resource-class';

export class DocumentCategoriesResource extends BaseResourceClass<'document_categories'> {
  protected item = 'document_categories';

  config() {
    this.query = {
      fields: ['*'],
    };
  }
}
