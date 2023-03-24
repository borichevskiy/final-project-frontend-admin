import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "./categories.actions";
import { CategoryState } from "../../types/category-state.type";

const initialState: CategoryState = {
  categories: [],
  category: null,
  pending: {
    categories: false,
    category: false,
  },
  errors: {
    categories: null,
    category: null,
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.pending.categories = true;
        state.errors.categories = null;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.pending.categories = false;
        state.categories = payload;
      })
      .addCase(
        getCategories.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.categories = false;
          state.errors.categories = action.payload.message;
        }
      )
      // ================ Get by id ================
      .addCase(getCategoryById.pending, (state) => {
        state.pending.category = true;
        state.errors.category = null;
      })
      .addCase(getCategoryById.fulfilled, (state, { payload }) => {
        state.pending.category = false;
        state.category = payload;
      })
      .addCase(
        getCategoryById.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.category = false;
          state.errors.category = action.payload.message;
        }
      )
      //================= Create ===================
      .addCase(createCategory.pending, (state) => {
        state.pending.category = true;
        state.errors.category = null;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.pending.category = false;
        state.category = payload;
      })
      .addCase(
        createCategory.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.category = false;
          state.errors.category = action.payload.message;
        }
      )
      //================= Update ====================
      .addCase(updateCategory.pending, (state) => {
        state.pending.category = true;
        state.errors.category = null;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.pending.category = false;
        state.category = payload;
      })
      .addCase(
        updateCategory.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.category = false;
          state.errors.category = action.payload.message;
        }
      );
  },
});

export default categoriesSlice.reducer;
