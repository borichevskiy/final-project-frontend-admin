//============== App ===================
import React from "react";
import { columnsUser } from "../constants/constants";
import AppTable from "components/app-table.component";
import { RowsUsers } from "./types/users-rows.type";

export const rows: Array<RowsUsers> = [
  {
    id: "fgjgjg",
    name: "Irina",
    email: "irina@gmail.com",
    phone: "+375298888888",
    address: "Minsk",
    status: "Active",
    role_name: "Manager",
    role_type: "Admin",
  }
];

export default function ContentAdminUsersPage() {
  return (
    <AppTable rows={rows} columns={columnsUser} />
  );
}
