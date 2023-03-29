import { useAppDispatch } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModalFormLayout from "components/form-modal-layout.component";
import { ModalFormRoleProps } from "app/types/props.type";
import { ProductsDto } from "./types/product-dto.type";
import { createProduct, getProductById, updateProduct } from "./store/products.action";
import { useProductSelector } from "./store/products.selectors";
import { useCategorySelector } from "app/categories/store/categories.selectors";
import { getCategories } from "app/categories/store/categories.actions";
import { CategoryDto } from "app/categories/types/category-dto.type";

export default function ModalProductForm({ id, isOpen, handleClose }: ModalFormRoleProps) {
  const dispatch = useAppDispatch();
  const { product } = useProductSelector();
  const { categories } = useCategorySelector();

  const [formTitle, setFormTitle] = useState<string>('CREATE PRIDUCT');
  const [buttonTitle, setButtonTitle] = useState<string>('CREATE');

  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productBrand, setProductBrand] = useState<string>('');
  const [productCategoryName, setProductCategoryName] = useState<number>(0);
  const [productDescription, setProductDescription] = useState<string>('');

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  // useEffect(() => {
  //   // console.log(categories)
  // },[categories])

  useEffect(() => {
    if (id) {
      const productId = String(id);
      setFormTitle('UPDATE PRODUCT');
      setButtonTitle('UPDATE');
      dispatch(getProductById({ productId }));
    } else {
      setFormTitle('CREATE PRODUCT');
      setButtonTitle('CREATE');
    }
  }, [dispatch, id])

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductDescription(product.description);
      setProductBrand(product.brand)
      setProductPrice(product.price)
      setProductQuantity(product.quantity)
    }
  }, [product]);


  const handleSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(productCategoryName)
    let dto: ProductsDto = {
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      brand: productBrand,
      description: productDescription,
      categoryId: productCategoryName
    }
    dispatch(createProduct({ dto }))
    handleClose()
  }

  const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productId = String(id);
    let dto: ProductsDto = {
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      brand: productBrand,
      description: productDescription,
      categoryId: productCategoryName
    }
    dispatch(updateProduct({ productId, dto }))
    handleClose()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (id)
      handleSubmitUpdate(event);
    else
      handleSubmitCreate(event);
  }

  return (
    <>
      <ModalFormLayout
        formTitle={formTitle}
        buttonTitle={buttonTitle}
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <TextField margin="normal"
          fullWidth
          name="name"
          label="Product name"
          type="name"
          id="name"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        />
        <TextField margin="normal"
          fullWidth
          name="price"
          label="Price"
          type="price"
          id="price"
          value={productPrice}
          onChange={(event) => setProductPrice(Number(event.target.value))} />
        <TextField margin="normal"
          fullWidth
          name="quantity"
          label="Quantity"
          type="quantity"
          id="quantity"
          value={productQuantity}
          onChange={(event) => setProductQuantity(Number(event.target.value))} />
        <TextField margin="normal"
          fullWidth
          name="brand"
          label="Brand"
          type="brand"
          id="brand"
          value={productBrand}
          onChange={(event) => setProductBrand(event.target.value)} />
        <TextField margin="normal"
          fullWidth
          name="description"
          label="Description"
          type="description"
          id="description"
          value={productDescription}
          onChange={(event) => setProductDescription(event.target.value)} />
        <Box sx={{ minWidth: 120, marginTop: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              required
              name="category"
              type="category"
              label="category"
              id="category"
              value={productCategoryName}
              onChange={(event) => setProductCategoryName(Number(event.target.value))}
            >
              {categories.map((category) => {
                return (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                );
              })} 
            </Select>
          </FormControl>
        </Box>
      </ModalFormLayout>
    </>
  );
}
