import * as React from "react";

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FormDialogWindow from "../../components/form-modal-layout.component";
import CardProduct from "./card-product.component";
import { useState, useEffect } from "react";
import { useAppDispatch } from "hooks/redux";
import { useProductSelector } from "./store/products.selectors";
import { createProduct, deleteProduct, getProducts } from "./store/products.action";
import { ProductsDto } from "./types/product-dto.type";
import { printReceived } from "jest-matcher-utils";
import ModalProductForm from "./modal-product-form.component";
import ConfirmDeletionWindow from "components/modal-form-confirm-delete.component";
import OpenModalFormButton from "components/modal-open-form-button.component";

export default function ContentAdminProductsPage() {
  const dispatch = useAppDispatch();
  const { products } = useProductSelector();
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState<number | string | undefined>(undefined);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, isOpen, id]);

  const handleOpenForm = (id: number | string | undefined) => {
    setId(id);
    setIsOpen(true)
  }

  const handleCloseForm = () => {
    setId(undefined)
    setIsOpen(false)
  }

  const handleOpenConfirmWindow = (id: number | string | undefined) => {
    setId(id);
    setOpenConfirmWindow(true);
  };

  const handleCloseConfirmWindow = () => {
    setId(undefined);
    setOpenConfirmWindow(false);
  };

  const handleConfirm = () => {
    let productId: string = String(id)
    dispatch(deleteProduct({ productId }))
    setOpenConfirmWindow(false)
  }


  return (
    <>
      <OpenModalFormButton handleClickOpen={handleOpenForm} buttonTitle="CREATE PRODUCT" />
      <ModalProductForm
        id={id}
        isOpen={isOpen}
        handleClose={handleCloseForm}
      />
      <ConfirmDeletionWindow
        handleClose={handleCloseConfirmWindow}
        isOpen={openConfirmWindow}
        handleConfirm={handleConfirm} />
      <Grid
        container
        spacing={{ xs: 2, md: 3}} 
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row">
        {products.map((product) => (
          <CardProduct
            key={product.id}
            product={product}
            handleOpenFormEdit={handleOpenForm}
            handleOpenConfirmWindow={handleOpenConfirmWindow}
          />
        ))}
      </Grid>
    </>
  );
}
