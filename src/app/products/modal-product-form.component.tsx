import { useAppDispatch } from "../../hooks/redux";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModalFormLayout from "components/form-modal-layout.component";
import { ModalFormRoleProps } from "app/types/props.type";

export default function ModalProductForm({ id, isOpen, handleClose }: ModalFormRoleProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [productName, setProductName] = useState<string>();

  const [formTitle, setFormTitle] = useState<string>('CREATE PRODUCT');
  const [buttonTitle, setButtonTitle] = useState<string>('CREATE');
  


  const handleSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTarget = event.currentTarget;

    
  }

  const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTarget = event.currentTarget;

    
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (id)
      handleSubmitUpdate(event);
    else
      handleSubmitCreate(event);
  }

  return (
    <>
      <ModalFormLayout
        formTitle={formTitle}
        buttonTitle={buttonTitle}
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <TextField
          margin="normal"
          label="Product name"
          name="productName"
          fullWidth
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        />        
      </ModalFormLayout>
    </>
  );
}
