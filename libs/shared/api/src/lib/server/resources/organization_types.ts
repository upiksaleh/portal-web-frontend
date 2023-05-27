import {BaseResourceClass} from "../resource-class";
import {imageFileNormalizer} from "../helpers";

export class OrganizationTypesResource extends BaseResourceClass<'organization_types'> {
  protected item = "organization_types";
  config() {
    this.query = {
      fields: [
        'id','name'
      ]
    }
  }
}
