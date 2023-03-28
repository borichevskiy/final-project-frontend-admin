//============== App ===================
import React, { useState } from "react";
import { columnsUser } from "../constants/constants";
import AppTable from "components/app-table.component";
import { RowsUsers } from "./types/users-rows.type";

export const rows: Array<RowsUsers> = [
  {
    id: "fgjgjg",
    name: "Irina",
    email: "irina@gmail.com",
    phone: "+375298888888",
    address: "Minsk",
    status: "Active",
    role_name: "Manager",
    role_type: "Admin",
  }
];

export default function ContentAdminUsersPage() {
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
  return (
    <>
      {/* <ModalRoleForm 
        id={id} 
        formTitle="NEW ROLE"  
        isOpen={openForm} 
        handleClose={handleCloseForm}
      /> */}
      {/* Confirm window */}
      <AppTable
        rows={rows}
        columns={columnsUser}
        isUserTable={false}
        handleOpenFormEdit={handleOpenForm}
        handleOpenConfirmDelete={handleOpenConfirmWindow}
      />
    </>
  );
}
