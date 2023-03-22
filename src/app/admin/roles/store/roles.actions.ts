import { createAsyncThunk } from "@reduxjs/toolkit";
import repository from "../../../../repository";

const headers = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQG1haWwucnUiLCJpZCI6IjgyMjdhZDE1LWIyZGItNGMxMi04YWIzLWRkZjAxOWViYjYxNSIsInJvbGVJZCI6IjMiLCJpYXQiOjE2Nzk1MDYyNDMsImV4cCI6MTY3OTUwOTg0M30.WP1xR9m5DdOFDGZXACSHTMJkLGt5YCIKBo_xVnS-ryE",
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
