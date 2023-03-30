import {Grid} from "@mui/material";
import CardProduct from "./card-product.component";
import { useState, useEffect } from "react";
import { useAppDispatch } from "hooks/redux";
import { useProductSelector } from "./store/products.selectors";
import { deleteProduct, getProducts } from "./store/products.action";
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
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          handleCloseConfirmWindow();
        }
      })
  }


  return (
    <>
      <OpenModalFormButton handleClickOpen={handleOpenForm} buttonTitle="CREATE PRODUCT" />
      <Grid
        container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        {products.map((product) => (
          <CardProduct
            key={product.id}
            product={product}
            handleOpenFormEdit={handleOpenForm}
            handleOpenConfirmWindow={handleOpenConfirmWindow}
          />
        ))}
      </Grid>
      <ModalProductForm
        id={id}
        isOpen={isOpen}
        handleClose={handleCloseForm}
      />
      <ConfirmDeletionWindow
        handleClose={handleCloseConfirmWindow}
        isOpen={openConfirmWindow}
        handleConfirm={handleConfirm} />
    </>
  );
}
