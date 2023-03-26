import FormDialogWindow from "../../components/form-modal-layout.component";
import { columnsRole } from "../constants/constants";
import { useAppDispatch } from "../../hooks/redux";
import { getRole } from "./store/roles.actions";
import { useRoleSelector } from "./store/roles.selectors";
import AppTable from "components/app-table.component";
import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export default function ContentAdminRolePage() {
  const dispatch = useAppDispatch();
  const { roles } = useRoleSelector();
  const [selectRoleType, setRoleType] = useState("");
  const [selectPermissions, setSelectPermissions] = useState("");

  const handleChangeRoleType = (event: SelectChangeEvent) => {
    setRoleType(event.target.value as string);
  };

  const handleSelectPermissions = (event: SelectChangeEvent) => {
    setSelectPermissions(event.target.value as string);
  };

  const handleSubmit = () => {

  }

  useEffect(() => {
    dispatch(getRole());
  }, [dispatch]);

  return (
    <>
      <FormDialogWindow buttonTitle="CREATE ROLE" formTitle="NEW ROLE" handleSubmit={handleSubmit}>
        <TextField margin="normal" label="Role name" fullWidth />
        <Box sx={{ marginTop: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="select-role-type-label">Role type</InputLabel>
            <Select
              labelId="select-role-type-label"
              id="select-role-type"
              value={selectRoleType}
              label="Role type"
              onChange={handleChangeRoleType}
            >
              <MenuItem value={10}>Client</MenuItem>
              <MenuItem value={20}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120, marginTop: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="select-permissions-label">Permissions</InputLabel>
            <Select
              labelId="select-permissions-label"
              id="select-permissions"
              value={selectPermissions}
              label="Role type"
              onChange={handleSelectPermissions}
            >
              <MenuItem value={10}>add-product</MenuItem>
              <MenuItem value={20}>delete-product</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </FormDialogWindow>
      <AppTable rows={roles} columns={columnsRole} />
    </>
  );
}
