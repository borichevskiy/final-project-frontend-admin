import FormDialogWindow from "../../components/form-modal-layout.component";
import { columnsRole } from "../constants/constants";
import { useAppDispatch } from "../../hooks/redux";
import { addRole, deleteRole, getRole } from "./store/roles.actions";
import { useRoleSelector } from "./store/roles.selectors";
import AppTable from "components/app-table.component";
import { useEffect, useState } from "react";
import { Box, Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Theme, useTheme } from "@mui/material";
import { CreateRoleDto } from "./types/create-role-dto.type";
import { UserRoleTypes } from "./enums/user-role-types.enum";
import { UserPermissions } from "./enums/user-permissions.enum";
import { useNavigate } from "react-router-dom";
import OpenModalFormButton from "components/modal-open-form-button.component";
import ModalRoleForm from "./modal-role-form.component";
import ConfirmDeletionWindow from "components/modal-form-confirm-delete.component";

export default function ContentAdminRolePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { roles } = useRoleSelector();
  
  const [openForm, setOpenForm] = useState(false);
  const [openConfirmWindow, setOpenConfirmWindow] = useState(false);
  const [id, setId] = useState<number | string | undefined>(undefined);

  useEffect(() => {
    dispatch(getRole());
  }, [dispatch]);

  const handleOpenForm = (id: number | string | undefined) => {
    setId(id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleOpenConfirmWindow = (id: number | string | undefined) => {
    setId(id);
    setOpenConfirmWindow(true);
  };

  const handleCloseConfirmWindow = () => {
    setOpenConfirmWindow(false);
  };

  const handleConfirm = () => {
    const roleId = Number(id);
    dispatch(deleteRole({id: roleId}))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          handleCloseConfirmWindow();
          navigate(0);
        }
      })
  }

  return (
    <>
      <OpenModalFormButton handleClickOpen={handleOpenForm} buttonTitle="CREATE ROLE"/>
      <ModalRoleForm 
        id={id}   
        isOpen={openForm} 
        handleClose={handleCloseForm}
      />
      <ConfirmDeletionWindow 
        handleConfirm={handleConfirm} 
        isOpen={openConfirmWindow} 
        handleClose={handleCloseConfirmWindow}
      />
      <AppTable
        rows={roles}
        columns={columnsRole}
        isUserTable={false}
        handleOpenFormEdit={handleOpenForm}
        handleOpenConfirmDelete={handleOpenConfirmWindow}
      />
    </>
  );
}
