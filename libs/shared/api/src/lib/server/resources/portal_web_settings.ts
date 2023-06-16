import { BaseResourceClass } from '../resource-class';

export class PortalWebSettingsResource extends BaseResourceClass<'portal_web_settings'> {
  protected item = 'portal_web_settings';
  singleton = true;

  config() {
    this.query = {
      fields: ['*'],
    };
  }

  protected normalizer(data: Record<string, any>) {
    delete data.id;
  }
}
