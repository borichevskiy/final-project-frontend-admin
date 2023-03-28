import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from '@mui/icons-material/Delete';

import { AppTableProps, Column } from "app/types/props.type";

export default function AppTable (
  {columns, rows, isUserTable, handleOpenFormEdit, handleOpenConfirmDelete} : AppTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column : Column) => (
                <TableCell
                  align={"center"}
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell/>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row : any) => {
                return (
                  <TableRow 
                    key={row.id}
                    hover 
                    role="checkbox" 
                    tabIndex={-1}
                  >
                    {columns.map((column) => {
                      let cellValue : string = row[column.id].toString();
                      if (!cellValue|| cellValue.length < 2)
                        cellValue = '-';
                      if (Array.isArray(row[column.id]))
                        cellValue = row[column.id].join(', ');
                      return (
                        <TableCell key={column.id} align={"center"}>
                          {column.format && typeof cellValue === "number"
                            ? column.format(cellValue)
                            : cellValue}
                        </TableCell>
                      );
                    })}

                    <TableCell align={"right"}>
                      <IconButton 
                        onClick={() => handleOpenFormEdit(row.id)} 
                        sx={{color: 'black', padding: 0}}
                      >
                        <EditIcon />
                      </IconButton>                     
                      {
                        isUserTable 
                          ? 
                            <IconButton 
                              onClick={() => handleOpenConfirmDelete(row.id)}
                              sx={{color: 'black', padding: 0}}
                            >
                              <BlockIcon /> 
                            </IconButton>
                          :
                            <IconButton 
                              onClick={() => handleOpenConfirmDelete(row.id)} 
                              sx={{color: 'black', padding: 0}}
                            >
                              <DeleteIcon/>
                            </IconButton>                            
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}