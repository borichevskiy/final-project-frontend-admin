import { createAsyncThunk } from "@reduxjs/toolkit";
import repository from "../../../../repository";

const headers = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const getRole = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await repository.get("/roles", headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t get roles.");
    }
  }
);
