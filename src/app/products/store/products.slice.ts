import { createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "../types/product-state.type";
import { getProducts } from "./products.action";

const initialState: ProductsState = {
  products: [],
  product: null,
  pending: {
    products: false,
    product: false,
  },
  errors: {
    products: null,
    product: null,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.pending.products = true;
        state.errors.products = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.pending.products = false;
        state.products = payload;
      })
      .addCase(
        getProducts.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.products = false;
          state.errors.products = action.payload.messege;
        }
      );
  },
});

export default productsSlice.reducer;
