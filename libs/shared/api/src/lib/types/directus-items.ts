import {
  ApplicationCategoriesItemType,
  ApplicationsItemType,
  BannerInfoItemType, DocumentCategoriesItemType, DocumentsItemType, GrafikInfoItemType,
  NewsCategoriesItemType,
  NewsItemType, OrganizationsItemType, OrganizationTypesItemType,
  PortalWebSettingsItemType,
  PublicServicesItemType
} from "./items-type";

export type DirectusItemsListType = {
  application_categories: ApplicationCategoriesItemType,
  applications: ApplicationsItemType,
  banner_info: BannerInfoItemType,
  document_categories: DocumentCategoriesItemType,
  documents: DocumentsItemType,
  grafik_info: GrafikInfoItemType,
  news: NewsItemType,
  news_categories: NewsCategoriesItemType,
  organization_types: OrganizationTypesItemType,
  organizations: OrganizationsItemType,
  portal_web_settings: PortalWebSettingsItemType
  public_services: PublicServicesItemType
}
