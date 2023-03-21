import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormDialogWindow from "./form-modal-layout.component";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export interface Column {
  id: "name" | "role_name" | "role_type" | "permission";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "role_name", label: "Role Name", minWidth: 150 },
  { id: "role_type", label: "Role Type", minWidth: 150 },
  { id: "permission", label: "Permission", minWidth: 150 },
];

export interface Data {
  name: string;
  role_name: string;
  role_type: string;
  permission: string;
}

function createData(
  name: string,
  role_name: string,
  role_type: string,
  permission: string
): Data {
  return { name, role_name, role_type, permission };
}

const rows = [
  createData("Irina", "Manager", "Admin", "permission"),
  createData("Regina", "Manager 2", "Admin", "permission"),
  createData("Alex", "Manager 3", "Admin", "permission"),
  createData("Dmitrij", "Client", "User", "permission"),
];

export default function ContentAdminRolePage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [select, setSelect] = React.useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event: any) => {
    setSelect(event.target.value as string);
  };

  return (
    <>
      <FormDialogWindow buttonTitle="CREATE ROLE" formTitle="NEW ROLE">
        <TextField margin="normal" label="Role name" fullWidth />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>Role Type</InputLabel>
            <Select value={select} onChange={handleChange}>
              <MenuItem value={10}>Role name</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </FormDialogWindow>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align={"right"}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell align={"right"}>
                        <EditIcon sx={{ marginRight: 2 }} />
                        <DeleteIcon />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
