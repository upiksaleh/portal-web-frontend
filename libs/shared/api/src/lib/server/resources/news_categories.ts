import {BaseResourceClass} from "../resource-class";

export class NewsCategoriesResource extends BaseResourceClass<'news_categories'> {
  protected item = "news_categories";

  config() {
    this.query = {
      fields: [
        'id', 'name', 'slug', 'description'
      ]
    }

  }

}
