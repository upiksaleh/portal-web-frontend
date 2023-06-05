import {OrganizationsItemType} from "./organizations";
import {FileType} from "@directus/sdk";

export type OrganizationPejabatItemType = {
  id: string;
  name: string;
  nip: string;
  jabatan: string;
  organization: string | OrganizationsItemType;
  image: string | FileType
  profil: string
};
