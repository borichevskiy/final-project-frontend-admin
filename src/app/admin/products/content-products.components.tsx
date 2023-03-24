import * as React from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FormDialogWindow from "../../../components/form-modal-layout.component";
import CardProduct from "./card-product.component";

export default function ContentAdminProductsPage() {
  const [select, setSelect] = React.useState("");

  const handleChange = (event: any) => {
    setSelect(event.target.value as string);
  };

  return (
    <>
      <FormDialogWindow buttonTitle="ADD PRODUCT" formTitle="NEW PRODUCT">
        <TextField margin="normal" label="Product name" fullWidth />
        <TextField margin="normal" label="Product description" fullWidth />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={select} onChange={handleChange}>
              <MenuItem value={10}>Category name</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </FormDialogWindow>
      <CardProduct></CardProduct>
    </>
  );
}
