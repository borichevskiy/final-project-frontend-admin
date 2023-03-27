import { createAsyncThunk } from "@reduxjs/toolkit";
import repository from "../../../repository";
import { ProductsDto } from "../types/product-dto.type";

const headers = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
};

export const getProducts = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await repository.get("/products", headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t get products.");
    }
  }
);

export const getProductById = createAsyncThunk<
  ProductsDto,
  { productId: number }
>("products/getById", async ({ productId }, thunkAPI) => {
  try {
    const response = await repository.get(`/products/${productId}`, headers);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Can`t get product.");
  }
});

export const createProduct = createAsyncThunk<
  ProductsDto,
  { dto: ProductsDto }
>("products/create", async ({ dto }, thinkAPI) => {
  try {
    const response = await repository.post("/products", dto, headers);
    return response.data;
  } catch (e) {
    return thinkAPI.rejectWithValue("Can`t create product.");
  }
});

export const updateProduct = createAsyncThunk<
  ProductsDto,
  { productId: string; dto: ProductsDto }
>("products/update", async ({ productId, dto }, thinkAPI) => {
  try {
    const response = await repository.put(`/products/${productId}`, dto, headers);
    return response.data;
  } catch (e) {
    return thinkAPI.rejectWithValue("Can`t update product.");
  }
});

export const deleteProduct = createAsyncThunk<
  ProductsDto,
  { productId: string }
>("products/delete", async ({ productId }, thunkAPI) => {
  try {
    const response = await repository.delete(`/products/${productId}`, headers);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Can`t delete product.");
  }
});
