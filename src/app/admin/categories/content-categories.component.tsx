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
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

//============= App =============
import * as React from "react";
import { useEffect } from "react";
import { RowsCategories } from "../types/types";
import { columnsCategories } from "../constants/constants";
import { useAppDispatch } from "../../hooks/redux";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "./store/categories.actions";
import { useCategorySelector } from "./store/categories.selectors";

const rows: Array<RowsCategories> = [
  {
    name: "Category name",
    description: "Category description",
  },
];

export default function ContentAdminCategoriesPage() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { categories } = useCategorySelector();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name: string = String(data.get("category_name"));
    const description: string = String(data.get("category_description"));
    const dto: any = {
      name: name,
      description: description,
    };
    console.log(dto);
    dispatch(createCategory({ dto }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div id="add category">
        <Button onClick={handleClickOpen}>
          <AddIcon
            sx={{
              marginRight: 2,
            }}
          />
          <Typography variant="body2" color="text.primary">
            ADD CATEGORY
          </Typography>
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>NEW CATEGORY</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                required
                id="category_name"
                name="category_name"
                autoComplete="category_name"
                margin="normal"
                label="Category name"
                fullWidth
              />
              <TextField
                required
                id="category_description"
                name="category_description"
                autoComplete="category_description"
                margin="normal"
                label="Category description"
                fullWidth
              />
              <Button type="submit">Create</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnsCategories.map((column: any) => (
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
              {categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      {columnsCategories.map((column: any) => {
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
                        <Button>
                          <EditIcon sx={{ marginRight: 2, color: "black" }} />
                        </Button>
                        <Button id="delete_button">
                          <DeleteIcon sx={{ color: "black" }} />
                        </Button>
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
