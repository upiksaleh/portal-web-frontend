import { FileType, UserType } from '@directus/sdk';
import { DirectusStatusType } from '../../server/directus';

export type BannerInfoItemType = {
  id: string;
  status: DirectusStatusType;
  title: string;
  sort: number;
  image: string | FileType;
  link?: string;
  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
