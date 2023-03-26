import { createAsyncThunk } from "@reduxjs/toolkit";
import repository from "../../../repository";

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
