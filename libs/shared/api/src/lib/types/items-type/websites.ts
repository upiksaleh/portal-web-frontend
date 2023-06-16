import { FileType, UserType } from '@directus/sdk';
import { OrganizationsItemType } from './organizations';
import { DirectusStatusType } from '../../server/directus';

export type WebsitesItemType = {
  id: string;
  status: DirectusStatusType;
  sort: number;
  name: string;
  slug: string;
  domain: string;
  domain_alias?: string;
  organization?: string | OrganizationsItemType;

  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
