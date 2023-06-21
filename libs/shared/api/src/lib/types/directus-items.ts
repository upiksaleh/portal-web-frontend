import {
  ApplicationCategoriesItemType,
  ApplicationsItemType,
  BannerInfoItemType,
  DocumentCategoriesItemType,
  DocumentsItemType,
  GrafikInfoItemType,
  NewsCategoriesItemType,
  NewsItemType,
  OrganizationDocumentsItemType,
  OrganizationPejabatItemType,
  OrganizationsItemType,
  OrganizationTypesItemType,
  PortalWebSettingsItemType,
  PublicServicesItemType,
  WebAduanPublikItemType,
  WebNewsItemType,
  WebsitesItemType,
} from './items-type';

export type DirectusItemsListType = {
  application_categories: ApplicationCategoriesItemType;
  applications: ApplicationsItemType;
  banner_info: BannerInfoItemType;
  document_categories: DocumentCategoriesItemType;
  documents: DocumentsItemType;
  grafik_info: GrafikInfoItemType;
  news: NewsItemType;
  news_categories: NewsCategoriesItemType;
  organization_documents: OrganizationDocumentsItemType;
  organization_pejabat: OrganizationPejabatItemType;
  organization_types: OrganizationTypesItemType;
  organizations: OrganizationsItemType;
  portal_web_settings: PortalWebSettingsItemType;
  public_services: PublicServicesItemType;
  websites: WebsitesItemType;
  web_aduan_publik: WebAduanPublikItemType;
  web_news: WebNewsItemType;
};
