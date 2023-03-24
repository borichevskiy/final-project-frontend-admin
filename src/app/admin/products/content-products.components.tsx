import * as React from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import FormDialogWindow from "../../../components/form-modal-layout.component";
import CardProduct from "./card-product.component";

export default function ContentAdminProductsPage() {
  const [select, setSelect] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  return (
    <>
      <FormDialogWindow buttonTitle="ADD PRODUCT" formTitle="NEW PRODUCT">
        <TextField margin="normal" label="Product name" fullWidth />
        <TextField margin="normal" label="Product description" fullWidth />
        <Box sx={{ minWidth: 120, marginTop: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="select-category-label">Category</InputLabel>
            <Select
              labelId="select-category-label"
              id="select-category"
              value={select}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value={10}>Category 1</MenuItem>
              <MenuItem value={20}>Category 2</MenuItem>
              <MenuItem value={30}>Category 3</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </FormDialogWindow>
      <CardProduct></CardProduct>
    </>
  );
}
