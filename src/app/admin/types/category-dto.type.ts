import { IdDto } from "./id-dto.type";

export interface CategoryDto extends IdDto  {
  name: string;
  description: string;
}