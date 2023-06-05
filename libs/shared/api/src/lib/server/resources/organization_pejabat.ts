import {BaseResourceClass} from "../resource-class";
import {imageFileNormalizer} from "../helpers";

export class OrganizationPejabatResource extends BaseResourceClass<'organization_pejabat'> {
  protected item = "organization_pejabat";
  config() {
    this.query = {
      fields: [
        'id','name','nip','jabatan','image.*','profil',
        'organization.id','organization.name','organization.slug',
      ]
    }
  }

  protected normalizerFields(): Record<string, any> {
    return {
      image: (value)=> value ? imageFileNormalizer(value) : null
    }
  }

  protected apiByPaths(): Record<string, any> {
    return {
      byOrganizationId:()=>{
        if (!this.pathQuery[1]) this.errorThrow('ID Organisasi diperlukan')
        this.query.limit = -1;
        this.andFilter({organization:{id:{_eq:this.pathQuery[1]}}});
      }
    };
  }
}
