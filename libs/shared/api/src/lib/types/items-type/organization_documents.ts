import { OrganizationsItemType } from './organizations';
import { FileType, UserType } from '@directus/sdk';
import { DirectusStatusType } from '../../server/directus';

export type OrganizationDocumentsItemType = {
  id: string;
  status: DirectusStatusType;
  publish_date: Date;
  organization: string | OrganizationsItemType;
  category: string;
  title: string;
  description?: string;
  slug?: string;
  file: string | FileType;

  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
