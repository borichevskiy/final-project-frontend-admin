import { IdDto } from "../../types/id-dto.type";

export interface RoleDto extends IdDto {
  userName: string;
  name: string;
  type: string;
  permission: string;
}
