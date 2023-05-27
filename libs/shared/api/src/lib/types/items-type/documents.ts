import {FileType, UserType} from "@directus/sdk";
import {DirectusStatusType} from "../../server/directus";
import {DocumentCategoriesItemType} from "./document_categories";

export type DocumentsItemType = {
  id: string;
  status: DirectusStatusType;
  publish_date: Date
  category: string|DocumentCategoriesItemType
  file: string|FileType
  title: string;
  description: string;
  user_created: string | UserType
  user_updated: string | UserType
  date_updated?: Date
  date_created: Date
};
