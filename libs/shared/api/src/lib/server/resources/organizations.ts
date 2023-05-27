import {BaseResourceClass} from "../resource-class";

export class OrganizationsResource extends BaseResourceClass<'organizations'> {
  protected item = "organizations";

  config() {
    this.query = {
      fields: [
        'id', 'name',
      ]
    }
  }
}
