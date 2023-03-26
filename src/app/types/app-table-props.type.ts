import { RowsCategories } from "app/categories/types/categories-rows.type";
import { RowsRoles } from "app/roles/types/roles-rows.type";
import { RowsUsers } from "app/users/types/users-rows.type";
import { RoleDto } from "../roles/types/role-dto.type";
import { Column } from "./table-column.type";

export type AppTablesProps = {
  rows: Array<RowsUsers> | Array<RowsCategories> | Array<RoleDto>;
  columns: Array<Column>;
}