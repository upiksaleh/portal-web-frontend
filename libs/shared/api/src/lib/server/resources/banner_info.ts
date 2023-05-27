import {BaseResourceClass} from "../resource-class";
import {imageFileNormalizer} from "../helpers";

export class BannerInfoResource extends BaseResourceClass<'banner_info'> {
  protected item = "banner_info";

  config() {
    this.query = {
      fields: [
        'id','link','sort','title','image.*',
      ]
    }
  }

  protected normalizer(data: Record<string, any>) {
    data.image = imageFileNormalizer(data.image);
  }

}
