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
  user_created: UserType;
  content: {
    time: number;
    blocks: Record<string, any>[];
    version: string;
  };
};
