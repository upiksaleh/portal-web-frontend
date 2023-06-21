import {
  ApplicationCategoriesResource,
  ApplicationsResource,
  BannerInfoResource,
  DocumentCategoriesResource,
  DocumentsResource,
  GrafikInfoResource,
  NewsCategoriesResource,
  NewsResource,
  OrganizationDocumentsResource,
  OrganizationPejabatResource,
  OrganizationsResource,
  OrganizationTypesResource,
  PortalWebSettingsResource,
  PublicServicesResource,
  WebAduanPublikResource,
  WebNewsResource,
  WebsitesResource,
} from './resources';
import { DirectusItemsListType } from '../types';

export const resourceLists: Record<keyof DirectusItemsListType | string, any> =
  {
    application_categories: ApplicationCategoriesResource,
    applications: ApplicationsResource,
    banner_info: BannerInfoResource,
    document_categories: DocumentCategoriesResource,
    documents: DocumentsResource,
    grafik_info: GrafikInfoResource,
    news: NewsResource,
    news_categories: NewsCategoriesResource,
    organization_documents: OrganizationDocumentsResource,
    organization_pejabat: OrganizationPejabatResource,
    organization_types: OrganizationTypesResource,
    organizations: OrganizationsResource,
    portal_web_settings: PortalWebSettingsResource,
    public_services: PublicServicesResource,
    websites: WebsitesResource,
    web_aduan_publik: WebAduanPublikResource,
    web_news: WebNewsResource,
  };

export function getResourceClass<Key extends keyof DirectusItemsListType>(
  key: Key | string
) {
  return resourceLists[key];
}
