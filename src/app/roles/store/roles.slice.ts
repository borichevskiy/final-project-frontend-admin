import { createSlice } from "@reduxjs/toolkit";
import { RoleState } from "../types/role-state.type";
import { addRole, getRole } from "./roles.actions";

const initialState: RoleState = {
  roles: [],
  role: null,
  pending: {
    roles: false,
    role: false,
  },
  errors: {
    roles: null,
    role: null,
  },
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ================ Get roles ===============
      .addCase(getRole.pending, (state) => {
        state.pending.roles = true;
        state.errors.roles = null;
      })
      .addCase(getRole.fulfilled, (state, { payload }) => {
        state.pending.roles = false;
        state.roles = payload;
      })
      .addCase(getRole.rejected, (state, action: any & { payload: any }) => {
        state.pending.roles = false;
        state.errors.roles = action.payload.message;
      })
      // ================ Add roles ===============
      .addCase(addRole.pending, (state) => {
        state.pending.role = true;
        state.errors.role = null;
      })
      .addCase(addRole.fulfilled, (state, { payload }) => {
        state.pending.role = false;
        state.role = payload;
      })
      .addCase(addRole.rejected, (state, action: any & { payload: any }) => {
        state.pending.role = false;
        state.errors.role = action.payload.message;
      })
  },
});

export default rolesSlice.reducer;
