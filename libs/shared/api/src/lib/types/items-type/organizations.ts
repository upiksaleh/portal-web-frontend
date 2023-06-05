import {DirectusStatusType} from "../../server/directus";
import {FileType, UserType} from "@directus/sdk";

export type OrganizationsItemType = {
  id: string;
  status: DirectusStatusType
  name: string;
  type: string | OrganizationsItemType
  slug: string

  email:string
  phone:string
  address:string
  location_point:any
  social_media:any
  structure: string,
  sekilas: string,
  visi: string,
  misi: string,

  // websites: any,
  user_created: string | UserType
  user_updated: string | UserType
  date_updated?: Date
  date_created: Date
};
