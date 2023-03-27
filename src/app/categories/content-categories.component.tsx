import * as React from "react";
import { useEffect, useState } from "react";
import { columnsCategories } from "../constants/constants";
import { useAppDispatch } from "../../hooks/redux";
import {
  createCategory,
  getCategories
} from "./store/categories.actions";
import { useCategorySelector } from "./store/categories.selectors";
import AppTable from "components/app-table.component";
import OpenModalFormButton from "components/modal-open-form-button.component";

export default function ContentAdminCategoriesPage() {
  const dispatch = useAppDispatch();
  const { categories } = useCategorySelector();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [openForm, setOpenForm] = useState(false);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [id, setId] = useState<number | string | undefined>(undefined);

  const handleOpenForm = (id: number | string | undefined) => {
    setId(id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleOpenConfirmWindow = () => {
    setOpenConfirmWindow(true);
  };

  const handleCloseConfirmWindow = () => {
    setOpenConfirmWindow(false);
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const name: string = String(data.get("category_name"));
  //   const description: string = String(data.get("category_description"));
  //   const dto: any = {
  //     name: name,
  //     description: description,
  //   };
  //   dispatch(createCategory({ dto }));
  // };

  return (
    <>
      <OpenModalFormButton handleClickOpen={handleOpenForm} buttonTitle="CREATE CATEGORYE"/>
      {/* <ModalCategoryForm 
        id={id} 
        formTitle="NEW Category"  
        isOpen={openForm} 
        handleClose={handleCloseForm}
      /> */}
      {/* Confirm window */}
      <AppTable
        rows={categories}
        columns={columnsCategories}
        isUserTable={false}
        handleOpenFormEdit={handleOpenForm}
        handleOpenConfirmDelete={handleOpenConfirmWindow}
      />
    </>
  );
}
