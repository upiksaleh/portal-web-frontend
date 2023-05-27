import {DefaultType, FileType, RelationItem, SystemType, UserType} from "@directus/sdk";
import {NewsCategoriesItemType} from "./news_categories";

export type NewsItemType = {
  id: string;
  title: string;
  slug: string;
  publish_date: Date;
  category: string | NewsCategoriesItemType;
  image_cover: string | FileType;
  status: string;
  description: string;
  view_count: number;
  shared_count: number;
  reporter: string;
  user_created: UserType,
  content: {
    time: number,
    blocks:Record<string, any>[],
    version: string
  }
};
