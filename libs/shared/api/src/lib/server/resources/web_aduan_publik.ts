import { BaseResourceClass } from '../resource-class';
import { dateUtils } from '@portal-web/shared-base';

export class WebAduanPublikResource extends BaseResourceClass<'web_aduan_publik'> {
  protected item = 'web_aduan_publik';
  config() {
    this.query = {
      meta: '*',
      limit: 10,
      page: 1,
      sort: ['-date_created'],
      fields: [
        'id',
        'nama',
        'email',
        'hp',
        'isi',
        'date_created'
      ],
    };
  }

  protected normalizer(data: Record<string, any>) {
    data.date_created_format = dateUtils.format(data.date_created, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  protected apiByPaths(){
      return {
        byWebId: () => {
          if (!this.pathQuery[1]) this.errorThrow('ID Web diperlukan');
          this.andFilter({
            website: { id: { _eq: this.pathQuery[1] } },
          });
        },
        sendNew: async ()=> {
          const {nama,email,hp,isi,website_id} = this.postData;
          if(!nama) this.errorThrow('nama: Nama tidak boleh kosong.');
          else if(!email) this.errorThrow('email: Email tidak boleh kosong.');
          else if(!hp) this.errorThrow('hp: Nomor Hp tidak boleh kosong.');
          else if(!isi) this.errorThrow('isi: Isi Aduan tidak boleh kosong.');
          else if(!website_id) this.errorThrow('website_id: ID Website tidak boleh kosong.');
          else if(typeof website_id !== 'string') this.errorThrow('website_id: ID harus berupa string.');
          const t = await this.itemsHandler().createOne({
            nama, email, hp, isi, website: website_id
        })
          return ()=> t;
        }
      }
  }
}
