import {BaseResourceClass} from "../resource-class";
import {imageFileNormalizer} from "../helpers";
import {dateUtils} from "@portal-web/shared-base";

export class PublicServicesResource extends BaseResourceClass<'public_services'> {
  protected item = "public_services";

  config() {
    this.query = {
      fields: [
        'id', 'title', 'description', 'images.image.*',
        'logo.*',
        'organization.id',
        'organization.slug',
        'organization.name',
        'links',
        'social_media',
        'address',
        'phones',
        'operational_hours',
        'type',
        'informations',
        'date_updated',
        'date_created',
      ]
    }
  }

  protected apiByPaths(): Record<string, any> {
    return {
      byId: () => {
        if (!this.pathQuery[1]) this.errorThrow('ID diperlukan')
        this.andFilter({id: {_eq: this.pathQuery[1]}});
        this.paramsQueryProcess = false;
        this.query.limit = 1;
        this.type = 'item'
      },
      listSortFields:()=>{
        this.query.fields = ['id','title','description','logo.*','type']
      }
    }
  }

  protected normalizer(data: Record<string, any>) {
    if (data.logo) {
      data.logo = imageFileNormalizer(data.logo)
    }
    if (data.images) {
      data.images = data.images.map(({image}) => imageFileNormalizer(image));
    }
    if (data.date_updated) {
      data.date_updated_format = dateUtils.format(data.date_updated, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
  }

}
