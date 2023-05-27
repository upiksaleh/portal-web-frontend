import {
  ApplicationCategoriesResource,
  ApplicationsResource,
  BannerInfoResource, DocumentCategoriesResource, DocumentsResource, GrafikInfoResource,
  NewsCategoriesResource,
  NewsResource, OrganizationsResource, OrganizationTypesResource,
  PortalWebSettingsResource,
  PublicServicesResource
} from "./resources";
import {BaseResourceClass} from "./resource-class";
import {DirectusItemsListType, ApiResourceProps} from "../types";

export const resourceLists: Record<keyof DirectusItemsListType | string, any> = {
  application_categories: ApplicationCategoriesResource,
  applications: ApplicationsResource,
  banner_info: BannerInfoResource,
  document_categories: DocumentCategoriesResource,
  documents: DocumentsResource,
  grafik_info: GrafikInfoResource,
  news: NewsResource,
  news_categories: NewsCategoriesResource,
  organization_types: OrganizationTypesResource,
  organizations: OrganizationsResource,
  portal_web_settings: PortalWebSettingsResource,
  public_services: PublicServicesResource
}

export function getResourceClass<Key extends keyof DirectusItemsListType>(key: Key | string) {
  return resourceLists[key];
}
