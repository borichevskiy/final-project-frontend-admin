import { useAppDispatch } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ModalFormLayout from "components/form-modal-layout.component";
import { ModalFormRoleProps } from "types/props.type";
import { ProductsDto } from "./types/product-dto.type";
import { createProduct, getProductById, updateProduct } from "./store/products.action";
import { useProductSelector } from "./store/products.selectors";
import { useCategorySelector } from "app/categories/store/categories.selectors";
import { getCategories, getCategoryById } from "app/categories/store/categories.actions";
import { CategoryDto } from "app/categories/types/category-dto.type";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { schemaProduct } from "./products-schema.yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ModalProductForm({ id, isOpen, handleClose }: ModalFormRoleProps) {
  const dispatch = useAppDispatch();
  const { product } = useProductSelector();
  const { categories } = useCategorySelector();

  const [formTitle, setFormTitle] = useState<string>('CREATE PRIDUCT');
  const [buttonTitle, setButtonTitle] = useState<string>('CREATE');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaProduct)
  });

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    setFormTitle('CREATE PRODUCT');
    setButtonTitle('CREATE');
    setValue('productName', '');
    setValue('productImage', '');
    setValue('productDescription', '');
    setValue('productBrand', '');
    setValue('productPrice', 0);
    setValue('productQuantity', 0);
    setValue('productCategory', '');
    reset();
    if (id) {
      const productId = String(id);
      setFormTitle('UPDATE PRODUCT');
      setButtonTitle('UPDATE');
      dispatch(getProductById({ productId }));
    }
  }, [dispatch, id])

  useEffect(() => {
    if (product) {
      setValue('productName', product.name);
      setValue('productImage', product.image);
      setValue('productDescription', product.description);
      setValue('productBrand', product.brand);
      setValue('productPrice', product.price);
      setValue('productQuantity', product.quantity);
      setValue('productCategory', product.categoryId);
    }
  }, [product]);


  const handleSubmitCreate = (data: FieldValues) => {
    const dto: ProductsDto = {
      name: data.productName,
      image: data.productImage,
      price: data.productPrice,
      quantity: data.productQuantity,
      brand: data.productBrand,
      description: data.productDescription,
      categoryId: data.productCategory
    }
    dispatch(createProduct({ dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          reset();
          handleClose();
        }
      })
  }

  const handleSubmitUpdate = (data: FieldValues) => {
    const productId = String(id);
    const dto: ProductsDto = {
      name: data.productName,
      image: data.productImage,
      price: data.productPrice,
      quantity: data.productQuantity,
      brand: data.productBrand,
      description: data.productDescription,
      categoryId: data.productCategory
    }
    dispatch(updateProduct({ productId, dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          reset();
          handleClose();
        }
      })
  }

  return (
    <>
      <ModalFormLayout
        formTitle={formTitle}
        buttonTitle={buttonTitle}
        handleSubmit={id ? handleSubmit(handleSubmitUpdate) : handleSubmit(handleSubmitCreate)}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <Controller
          name="productName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              helperText={errors.productName ? `${errors.productName.message}` : ''}
              margin="normal"
              fullWidth
              label="Product name"
              id="productName"
              value={value ? value : ''}
              onChange={onChange}
              error={errors.productName ? true : false}
            />
          )}
        />
        <Controller
          name="productImage"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              helperText={errors.productImage ? `${errors.productImage.message}` : ''}
              margin="normal"
              fullWidth
              label="Url to product image"
              id="productImage"
              value={value ? value : ''}
              onChange={onChange}
              error={errors.productImage ? true : false}
            />
          )}
        />
        <Controller
          name="productPrice"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              helperText={errors.productPrice ? `${errors.productPrice.message}` : ''}
              margin="normal"
              fullWidth
              label="Product price"
              id="productPrice"
              value={value}
              onChange={onChange}
              error={errors.productPrice ? true : false}
            />
          )}
        />
        <Controller
          name="productQuantity"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              helperText={errors.productQuantity ? `${errors.productQuantity.message}` : ''}
              margin="normal"
              fullWidth
              label="Product quantity"
              id="productQuantity"
              value={value}
              onChange={onChange}
              error={errors.productQuantity ? true : false}
            />
          )}
        />
        <Controller
          name="productBrand"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              helperText={errors.productBrand ? `${errors.productBrand.message}` : ''}
              margin="normal"
              fullWidth
              label="Product brand"
              id="productBrand"
              value={value ? value : ''}
              onChange={onChange}
              error={errors.productBrand ? true : false}
            />
          )}
        />
        <Controller
          name="productDescription"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              helperText={errors.productDescription ? `${errors.productDescription.message}` : ''}
              margin="normal"
              fullWidth
              label="Product description"
              id="productDescription"
              value={value ? value : ''}
              onChange={onChange}
              error={errors.productDescription ? true : false}
            />
          )}
        />
        <Box sx={{ minWidth: 120, marginTop: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Controller
              name="productCategory"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Select
                    sx={{ width: '100%' }}
                    labelId="select-role-type-label"
                    label="Role type"
                    error={errors.productCategory ? true : false}
                    value={value ? value : ''}
                    onChange={onChange}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText
                    sx={{ color: 'red' }}
                  >
                    {errors.productCategory ? `${errors.productCategory.message}` : ''}
                  </FormHelperText>
                </>
              )}
            />
          </FormControl>
        </Box>
      </ModalFormLayout>
    </>
  );
}
