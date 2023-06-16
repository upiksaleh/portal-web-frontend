import { FileType, ID, UserType } from '@directus/sdk';
import { DirectusStatusType } from '../../server/directus';
import { ApplicationCategoriesItemType } from './application_categories';
import { OrganizationsItemType } from './organizations';

export type ApplicationsItemType = {
  id: string;
  status: DirectusStatusType;
  sort: number;
  slug: string;
  title: string;
  description?: string;
  logo?: string | FileType;
  categories: { id: ID; category: ApplicationCategoriesItemType[] };
  link?: string;
  links?: { link: string; name: string }[];
  social_media?: { link: string; name: string }[];
  organization?: string | OrganizationsItemType;

  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
