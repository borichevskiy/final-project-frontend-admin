import { useAppDispatch } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import ModalFormLayout from "components/form-modal-layout.component";
import { ModalFormRoleProps } from "app/types/props.type";
import { createCategory, getCategoryById, updateCategory } from "./store/categories.actions";
import { useCategorySelector } from "./store/categories.selectors";
import { CreateCategoryDto } from "./types/create-category-dto.type";

export default function ModalCategoryForm({ id, isOpen, handleClose }: ModalFormRoleProps) {
  const dispatch = useAppDispatch();

  const [formTitle, setFormTitle] = useState<string>('CREATE CATEGORY');
  const [buttonTitle, setButtonTitle] = useState<string>('CREATE');

  const { category } = useCategorySelector();

  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryDescription, setCategoryDescription] = useState<string>('');

  useEffect(() => {
    if (id) {
      const categoryId = Number(id);
      setFormTitle('UPDATE CATEGORY');
      setButtonTitle('UPDATE');
      dispatch(getCategoryById({ categoryId }));
    } else {
      setFormTitle('CREATE CATEGORY');
      setButtonTitle('CREATE');
      setCategoryName('');
      setCategoryDescription('');
    }
  }, [id]);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setCategoryDescription(category.description);
    }
  }, [category]);

  const handleSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTarget = event.currentTarget;

    const data = new FormData(event.currentTarget);
    const name: string = String(data.get('categoryName'));
    const description: string = String(data.get('categoryDescription'));
    const dto: CreateCategoryDto = {
      name, description
    };

    dispatch(createCategory({ dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          currentTarget.reset();
          handleClose();
        }
      })
  }

  const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTarget = event.currentTarget;

    const data = new FormData(event.currentTarget);
    const name: string = String(data.get('categoryName'));
    const description: string = String(data.get('categoryDescription'));
    const dto: CreateCategoryDto = {
      name, description
    };

    const categoryId = Number(id);
    dispatch(updateCategory({ categoryId, dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          currentTarget.reset();
          handleClose();
        }
      })
  }

  return (
    <ModalFormLayout
      formTitle={formTitle}
      buttonTitle={buttonTitle}
      handleSubmit={id ? handleSubmitUpdate : handleSubmitCreate}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <TextField
        margin="normal"
        label="Category name"
        name="categoryName"
        fullWidth
        value={categoryName}
        onChange={(event) => setCategoryName(event.target.value)}
      />      
      <TextField
        margin="normal"
        label="Category description"
        name="categoryDescription"
        fullWidth
        value={categoryDescription}
        onChange={(event) => setCategoryDescription(event.target.value)}
      />    
    </ModalFormLayout>
  );
}
