import { createSlice } from "@reduxjs/toolkit";
import { ProductsState } from "../types/product-state.type";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "./products.action";

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
      )
      // ================ Get by id ================
      .addCase(getProductById.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        getProductById.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        }
      )
      //================= Create ===================
      .addCase(createProduct.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        createProduct.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        }
      )
      //================= Update ====================
      .addCase(updateProduct.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        updateProduct.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        }
      )
      // ================ Delete ================
      .addCase(deleteProduct.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.pending.product = false;
        state.product = payload;
      })
      .addCase(
        deleteProduct.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload.message;
        }
      );
  }
}
);

export default productsSlice.reducer;
