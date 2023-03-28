import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// =========== App =======================
import { useAppDispatch } from "../../hooks/redux";
import { deleteProduct, getProductById, getProducts, updateProduct } from "./store/products.action";
import { useProductSelector } from "./store/products.selectors";
import { ProductsDto } from "./types/product-dto.type";
import OpenModalFormButton from "components/modal-open-form-button.component";
import ModalProductForm from "./modal-product-form.component";
import ConfirmDeletionWindow from "components/modal-form-confirm-delete.component";
import FormDialogWindow from "../../components/form-modal-layout.component";

export type CardProductProps = {
  product: ProductsDto,
  handleOpenFormEdit: (id: string | number | undefined) => void,
  handleOpenConfirmWindow: (id: string | number | undefined) => void
}

export default function CardProduct({ product, handleOpenFormEdit, handleOpenConfirmWindow }: CardProductProps) {

  return (
    <Grid
    item xs={4} md={3}>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          sx={{ height: 200 }}
          image="https://images.demandware.net/dw/image/v2/BBBV_PRD/on/demandware.static/-/Sites-master-catalog/default/dwd633af54/images/700000/704909.jpg?sw=2000"
          title="Product"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <div key={product.id}>{product.name}</div>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div key={product.id}>{product.description}</div>
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="body2" color="text.secondary">
            <IconButton
              onClick={() => handleOpenFormEdit(product.id)}
              sx={{ color: 'black', padding: 0 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleOpenConfirmWindow(product.id)}
              sx={{ color: 'black', padding: 0 }}
            >

              <DeleteIcon />
            </IconButton>
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
}
