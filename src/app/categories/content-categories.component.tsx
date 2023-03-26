import * as React from "react";
import { useEffect } from "react";
import { columnsCategories } from "../constants/constants";
import { useAppDispatch } from "../../hooks/redux";
import {
  createCategory,
  getCategories
} from "./store/categories.actions";
import { useCategorySelector } from "./store/categories.selectors";
import AppTable from "components/app-table.component";
import { TextField } from "@mui/material";
import FormDialogWindow from "components/form-modal-layout.component";

export default function ContentAdminCategoriesPage() {
  const dispatch = useAppDispatch();
  const { categories } = useCategorySelector();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name: string = String(data.get("category_name"));
    const description: string = String(data.get("category_description"));
    const dto: any = {
      name: name,
      description: description,
    };
    dispatch(createCategory({ dto }));
  };

  return (
    <>
      <FormDialogWindow 
        buttonTitle="CREATE CATEGORY" 
        formTitle="NEW CATEGORY" 
        handleSubmit={handleSubmit}
      >        
        <TextField
          required
          id="category_name"
          name="category_name"
          autoComplete="category_name"
          margin="normal"
          label="Category name"
          fullWidth
        />
        <TextField
          required
          id="category_description"
          name="category_description"
          autoComplete="category_description"
          margin="normal"
          label="Category description"
          fullWidth
        />
      </FormDialogWindow>
      <AppTable rows={categories} columns={columnsCategories} />
    </>
  );
}
