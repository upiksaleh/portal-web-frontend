import { FileType, UserType } from '@directus/sdk';
import { NewsCategoriesItemType } from './news_categories';
import { DirectusStatusType } from '../../server/directus';

export type NewsItemType = {
  id: string;
  title: string;
  slug: string;
  publish_date: Date;
  category: string | NewsCategoriesItemType;
  image_cover: string | FileType;
  status: DirectusStatusType;
  description: string;
  view_count: number;
  shared_count: number;
  reporter: string;
  content: {
    time: number;
    blocks: Record<string, any>[];
    version: string;
  };

  user_created: string | UserType;
  user_updated: string | UserType;
  date_updated?: Date;
  date_created: Date;
};
