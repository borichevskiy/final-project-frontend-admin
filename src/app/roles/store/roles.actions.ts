import { createAsyncThunk } from "@reduxjs/toolkit";
import repository from "../../../repository";
import { CreateRoleDto } from "../types/create-role-dto.type";
import { RoleDto } from "../types/role-dto.type";

const headers = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const getRole = createAsyncThunk(
  "roles/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await repository.get("/roles", headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t get roles.");
    }
  }
);


export const addRole = createAsyncThunk<RoleDto, {dto: CreateRoleDto} >(
  "roles/addRole",
  async ({dto}, thunkAPI) => {
    try {
      const response = await repository.post("/roles", dto, headers);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can`t create roles.");
    }
  }
);