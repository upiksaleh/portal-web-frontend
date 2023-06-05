import {BaseResourceClass} from "../resource-class";
import {STATUS_PUBLISHED} from "../directus";
import {imageFileNormalizer} from "../helpers";

export class OrganizationsResource extends BaseResourceClass<'organizations'> {
  protected item = "organizations";

  config() {
    this.query = {
      filter:{status:{_eq:STATUS_PUBLISHED}},
      fields: [
        'id', 'name','slug','type.*','address','email','phone','location_point'
      ]
    }
  }

  protected apiByPaths(): Record<string, any> {
    return {
      getSekilasById:()=>{
        if (!this.pathQuery[1]) this.errorThrow('ID diperlukan');
        this.query.fields = ['sekilas'];
        this.andFilter({id:{_eq: this.pathQuery[1]}});
        this.type = "item";
        return ({data}) => {
          return data[0].sekilas;
        }
      },
      getStructureById:()=>{
        if (!this.pathQuery[1]) this.errorThrow('ID diperlukan');
        this.query.fields = ['structure'];
        this.andFilter({id:{_eq: this.pathQuery[1]}});
        this.type = "item";
        return ({data}) => {
          return data[0].structure;
        }
      },
      getVisiMisiById:()=>{
        if (!this.pathQuery[1]) this.errorThrow('ID diperlukan');
        this.query.fields = ['visi','misi'];
        this.andFilter({id:{_eq: this.pathQuery[1]}});
        this.type = "item";
      },
    }
  }
}
