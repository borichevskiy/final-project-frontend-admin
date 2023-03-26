import { IdDto } from "../../types/id-dto.type";

export interface RoleDto extends IdDto {
  name: string;
  type: string;
  permissions: string;
}
