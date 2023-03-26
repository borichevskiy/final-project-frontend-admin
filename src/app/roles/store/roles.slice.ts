import { createSlice } from "@reduxjs/toolkit";
import { RoleState } from "../types/role-state.type";
import { getRole } from "./roles.actions";

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
      });
  },
});

export default rolesSlice.reducer;
