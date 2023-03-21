import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";

//============== App ===================
import TableComponent from "./table-layuot.component";
import { RowsProps } from "./types/types";
import { columnsUser } from "./constants/constants";

export const rows: Array<RowsProps> = [
  {
    name: "Irina",
    email: "irina@gmail.com",
    phone: 375298888888,
    address: "Minsk",
    status: "Active",
    role_name: "Manager",
    role_type: "Admin",
  }
];

export default function ContentAdminUsersPage() {
  return (
    <>
      <TableComponent columns={columnsUser} rows={rows}>
        <EditIcon sx={{ marginRight: 2 }} />
        <BlockIcon />
      </TableComponent>
    </>
  );
}
