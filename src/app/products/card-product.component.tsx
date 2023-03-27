import React, { useEffect } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// =========== App =======================
import { useAppDispatch } from "../../hooks/redux";
import { deleteProduct, getProductById, getProducts, updateProduct } from "./store/products.action";
import { useProductSelector } from "./store/products.selectors";
import { ProductsDto } from "./types/product-dto.type";
import FormEditWindow from "components/form-edit-window-component";

export default function CardProduct(product: ProductsDto) {
  const [selectValue, setSelectValue] = React.useState("");
  const dispatch = useAppDispatch();
  const { products } = useProductSelector();

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
  };

  const handleDelete = () => {
    let productId: string = String(product.id)
    dispatch(deleteProduct({productId}))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTarget = event.currentTarget;
    let dto: ProductsDto = {}
    const data = new FormData(event.currentTarget)
    const productId: string = String(product.id)
    const name: string = String(data.get('name'));
    if (name) {dto = {...dto, name}}
    const description: string = String(data.get('description'));
    if (description) {dto = {...dto, description}}
    const categoryName: string = String(data.get('category'));
    if (categoryName) {dto = {...dto, categoryName}}
    const price: number = Number(data.get('price'));
    if (price) {dto = {...dto, price}}
    const quantity: number = Number(data.get('quantity'));
    if (quantity) {dto = {...dto, quantity}}
    const brand: string = String(data.get('brand'));
    if (brand) {dto = {...dto, brand}}
    dispatch(updateProduct({ productId, dto }))
    
  }



  return (
    <Grid>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          sx={{ height: 200 }}
          image="https://images.demandware.net/dw/image/v2/BBBV_PRD/on/demandware.static/-/Sites-master-catalog/default/dwd633af54/images/700000/704909.jpg?sw=2000"
          title="Product"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <div key={product.id}>{product.name}</div>
            {/* Product Name */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              <div key={product.id}>{product.description}</div>
            {/* Product description */}
          </Typography>
        </CardContent>
        <CardActions>

          <Typography variant="body2" color="text.secondary">

            <FormEditWindow
              buttonTitle="EDIT"
              formTitle="EDIT PRODUCT"
              handleSubmit={handleSubmit}
            >
              <div key={product.name}>{product.id}</div>
              <TextField margin="normal"
                fullWidth
                name="name"
                label="Product name"
                type="name"
                id="name"
                defaultValue={null} />
              <TextField margin="normal"
                fullWidth
                name="price"
                label="Price"
                type="price"
                id="price"
                defaultValue={null} />
              <TextField margin="normal"
                fullWidth
                name="quantity"
                label="Quantity"
                type="quantity"
                id="quantity" 
                defaultValue={null}/>
              <TextField margin="normal"
                fullWidth
                name="brand"
                label="Brand"
                type="brand"
                id="brand" 
                defaultValue={null}/>
              <TextField margin="normal"
                fullWidth
                name="description"
                label="Description"
                type="description"
                id="description" 
                defaultValue={null}/>
              <Box sx={{ minWidth: 120, marginTop: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    type="category"
                    label="category"
                    id="category"
                    defaultValue="null"
                    value={selectValue}
                    onChange={handleChangeSelect}
                  >
                    <MenuItem value={'Category 1'}>Category 1</MenuItem>
                    <MenuItem value={'Category 2'}>Category 2</MenuItem>
                    <MenuItem value={'Category 3'}>Category 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </FormEditWindow>
          </Typography>
          <Button size="medium" onClick={handleDelete}>
            <DeleteIcon />
            <Typography variant="body2" color="text.secondary">
              DELETE
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
