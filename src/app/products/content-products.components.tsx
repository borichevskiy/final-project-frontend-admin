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
import FormDialogWindow from "../../components/form-modal-layout.component";
import CardProduct from "./card-product.component";
import { useState, useEffect } from "react";
import { useAppDispatch } from "hooks/redux";
import { useProductSelector } from "./store/products.selectors";
import { createProduct, getProducts } from "./store/products.action";
import { ProductsDto } from "./types/product-dto.type";
import { printReceived } from "jest-matcher-utils";
import ModalProductForm from "./modal-product-form.component";
import ConfirmDeletionWindow from "components/modal-form-confirm-delete.component";
import OpenModalFormButton from "components/modal-open-form-button.component";

export default function ContentAdminProductsPage() {
  const [selectValue, setSelectValue] = useState("");
  const dispatch = useAppDispatch();
  const { products } = useProductSelector();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTarget = event.currentTarget;

    const data = new FormData(event.currentTarget)
    const name: string = String(data.get('name'));
    const description: string = String(data.get('description'));
    const category: string = String(data.get('category'));
    const price: number = Number(data.get('price'));
    const quantity: number = Number(data.get('quantity'));
    const brand: string = String(data.get('brand'));
    const dto: ProductsDto = {
      name: name,
      price: price,
      quantity: quantity,
      brand: brand,
      description: description,
      categoryName: category
    };

    dispatch(createProduct({ dto }))
  }

  return (
    <>
      <FormDialogWindow
        buttonTitle="ADD PRODUCT"
        formTitle="NEW PRODUCT"
        handleSubmit={handleSubmit}
      >
        <TextField margin="normal"
          required
          fullWidth
          name="name"
          label="Product name"
          type="name"
          id="name" />
        <TextField margin="normal"
          required
          fullWidth
          name="price"
          label="Price"
          type="price"
          id="price" />
        <TextField margin="normal"
          fullWidth
          name="quantity"
          label="Quantity"
          type="quantity"
          id="quantity" />
        <TextField margin="normal"
          fullWidth
          name="brand"
          label="Brand"
          type="brand"
          id="brand" />
        <TextField margin="normal"
          fullWidth
          name="description"
          label="Description"
          type="description"
          id="description" />
        <Box sx={{ minWidth: 120, marginTop: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              required
              name="category"
              type="category"
              label="category"
              id="category"
              value={selectValue}
              onChange={handleChangeSelect}
            >
              <MenuItem value={'Category 1'}>Category 1</MenuItem>
              <MenuItem value={'Category 2'}>Category 2</MenuItem>
              <MenuItem value={'Category 3'}>Category 3</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </FormDialogWindow>
      {products.map((i) => (
      <CardProduct {...i}/>
      ))}
    </>
  );
}
