//============== App ===================
import React, { useEffect, useState } from "react";
import { columnsUser } from "../constants/constants";
import AppTable from "components/app-table.component";
import { RowsUsers } from "./types/users-rows.type";
import { useAppDispatch } from "hooks/redux";
import { useUserSelector } from "./store/users.selectors";
import { getUsers } from "./store/users.actions";
import ModalUserForm from "./modal-user-form.component";
import ConfirmDeletionWindow from "components/modal-form-confirm-delete.component";
import ModalStatusForm from "./modal-user-form-status.component";

export default function ContentAdminUsersPage() {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const { users } = useUserSelector();

  const [openForm, setOpenForm] = useState(false);
  const [openStatusForm, setOpenStatusForm] = useState(false);
  const [id, setId] = useState<number | string | undefined>(undefined);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, id, openForm]);

  const handleOpenForm = (id: number | string | undefined) => {
    setId(id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setId(undefined);
    setOpenForm(false);
  };

  const handleOpenStatusForm = (id: number | string | undefined) => {
    setId(id);
    setOpenStatusForm(true);
  };

  const handleCloseStatusForm = () => {
    setId(undefined);
    setOpenStatusForm(false);
  };

  return (
    <>
      <AppTable
        rows={users}
        columns={columnsUser}
        isUserTable={true}
        handleOpenFormEdit={handleOpenForm}
        handleOpenConfirmDelete={handleOpenStatusForm}
      />
      <ModalUserForm 
        id={id}   
        isOpen={openForm} 
        handleClose={handleCloseForm}
      />
      <ModalStatusForm
        id={id}   
        isOpen={openStatusForm} 
        handleClose={handleCloseStatusForm}
      />
    </>
  );
}
