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
import { useState } from "react";
import ModalProductForm from "./modal-product-form.component";
import ConfirmDeletionWindow from "components/modal-form-confirm-delete.component";
import OpenModalFormButton from "components/modal-open-form-button.component";

export default function ContentAdminProductsPage() {
  const [selectValue, setSelectValue] = useState("");

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };

  const handleSubmit = () => {

  }

  return (
    <>
      {/* <OpenModalFormButton handleClickOpen={handleOpenForm} buttonTitle="CREATE PRODUCT"/> */}
      {/* <ModalProductForm 
        id={id}   
        isOpen={openForm} 
        handleClose={handleCloseForm}
      />
      <ConfirmDeletionWindow 
        handleConfirm={handleConfirm} 
        isOpen={openConfirmWindow} 
        handleClose={handleCloseConfirmWindow}
      /> */}
      <CardProduct />
    </>
  );
}
