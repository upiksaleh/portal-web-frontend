import { FileType, UserType } from '@directus/sdk';
import { WebsitesItemType } from './websites';
import { DirectusStatusType } from '../../server/directus';

export type WebNewsItemType = {
  id: string;
  title: string;
  slug: string;
  publish_date: Date;
  website: string | WebsitesItemType;
  image_cover: string | FileType;
  status: DirectusStatusType;
  description: string;
  view_count: number;
  shared_count: number;
  reporter: string;
  user_created: UserType;
  tags?: string[];
  content: {
    time: number;
    blocks: Record<string, any>[];
    version: string;
  };
};
