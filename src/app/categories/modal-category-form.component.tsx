import { useAppDispatch } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import ModalFormLayout from "components/form-modal-layout.component";
import { ModalFormRoleProps } from "types/props.type";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "./store/categories.actions";
import { useCategorySelector } from "./store/categories.selectors";
import { CreateCategoryDto } from "./types/create-category-dto.type";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCreateCategory } from "./category-schemas.yap";

export default function ModalCategoryForm({
  id,
  isOpen,
  handleClose,
}: ModalFormRoleProps) {
  const dispatch = useAppDispatch();

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaCreateCategory),
    defaultValues: { name: "", description: "" },
  });

  const [formTitle, setFormTitle] = useState<string>("CREATE CATEGORY");
  const [buttonTitle, setButtonTitle] = useState<string>("CREATE");

  const { category } = useCategorySelector();

  useEffect(() => {
    if (id) {
      const categoryId = Number(id);
      setFormTitle("UPDATE CATEGORY");
      setButtonTitle("UPDATE");
      dispatch(getCategoryById({ categoryId }));
    } else {
      setFormTitle("CREATE CATEGORY");
      setButtonTitle("CREATE");
    }
  }, [id]);

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description);
    }
  }, [category]);

  const handleSubmitCreate = (data: FieldValues) => {
    const dto: CreateCategoryDto = {
      name: data.name,
      description: data.description,
    };

    dispatch(createCategory({ dto })).then(({ meta }) => {
      if (meta.requestStatus !== "rejected") {
        reset();
        handleClose();
      }
    });
  };

  const handleSubmitUpdate = (data: FieldValues) => {
    const dto: CreateCategoryDto = {
      name: data.name,
      description: data.description,
    };

    const categoryId = Number(id);
    dispatch(updateCategory({ categoryId, dto })).then(({ meta }) => {
      if (meta.requestStatus !== "rejected") {
        reset();
        handleClose();
      }
    });
  };

  return (
    <ModalFormLayout
      formTitle={formTitle}
      buttonTitle={buttonTitle}
      handleSubmit={
        id ? handleSubmit(handleSubmitUpdate) : handleSubmit(handleSubmitCreate)
      }
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            helperText={errors.name ? `${errors.name.message}` : ""}
            margin="normal"
            label="Category name"
            name="categoryName"
            fullWidth
            value={value ? value : ""}
            onChange={onChange}
            error={errors.name ? true : false}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            helperText={
              errors.description ? `${errors.description.message}` : ""
            }
            margin="normal"
            label="Category description"
            name="categoryDescription"
            fullWidth
            value={value ? value : ""}
            onChange={onChange}
            error={errors.description ? true : false}
          />
        )}
      />
    </ModalFormLayout>
  );
}
