import { WebsitesItemType } from "./websites";

export type WebAduanPublikItemType = {
  id: string;
  nama: string;
  email: string;
  hp: string;
  isi: string;
  website: string|WebsitesItemType;
  date_updated?: Date;
  date_created: Date;
};
