import {DirectusStatusType} from "../../server/directus";
import {UserType} from "@directus/sdk";

export type OrganizationsItemType = {
  id: string;
  status: DirectusStatusType
  name: string;
  type: string | OrganizationsItemType
  slug: string
  // websites: any,
  user_created: string | UserType
  user_updated: string | UserType
  date_updated?: Date
  date_created: Date
};
