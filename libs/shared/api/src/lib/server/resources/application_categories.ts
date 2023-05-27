import {BaseResourceClass} from "../resource-class";
import {imageFileNormalizer} from "../helpers";

export class ApplicationCategoriesResource extends BaseResourceClass<'application_categories'> {
  protected item = "application_categories";

  config() {
    this.query = {
      fields: [
        'id','name'
      ]
    }
  }

}
