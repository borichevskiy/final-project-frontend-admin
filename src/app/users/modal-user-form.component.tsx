import { useAppDispatch } from "../../hooks/redux";
import { useRoleSelector } from "app/roles/store/roles.selectors";
import { useEffect, useState } from "react";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import ModalFormLayout from "components/form-modal-layout.component";
import { ModalFormRoleProps } from "app/types/props.type";
import { getRoles } from "app/roles/store/roles.actions";
import { assignRoleOnUser, getUserById } from "./store/users.actions";
import { useUserSelector } from "./store/users.selectors";
import { UserAssignRoleDto } from "./types/user-assign-role-dto.type";


export default function ModalUserForm({ id, isOpen, handleClose }: ModalFormRoleProps) {
  const dispatch = useAppDispatch();

  const { roles } = useRoleSelector();
  const { user } = useUserSelector();

  const [userFullName, setUserFullName] = useState<string>('user name');
  const [userEmail, setUserEmail] = useState<string>('user email');

  const [selectRoleName, setRoleName] = useState<string>('');

  useEffect(() => {
    if (id) {
      const userId = String(id);
      dispatch(getUserById({ id: userId }));
      dispatch(getRoles());
    } 
  }, [id]);

  useEffect(() => {
    if (user) {
      setUserFullName(user.fullName);
      setUserEmail(user.email);
      setRoleName(user.roleName);
    }
  }, [user]);

  const handleSelectRole = (event: SelectChangeEvent) => {
    const role = roles.find((role) => role.name === event.target.value)
    if (role) {
      setRoleName(role.name);
    } else {
      setRoleName('');
    }
  };

  const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTarget = event.currentTarget;
    const role = roles.find((role) => role.name === selectRoleName)
    if (role) {
      const dto: UserAssignRoleDto = {
          name: selectRoleName,
          type: role.type
        }
      const userId = String(id);
      dispatch(assignRoleOnUser({ id: userId, dto }))
        .then(({ meta }) => {
          if (meta.requestStatus !== 'rejected') {
            currentTarget.reset();
            handleClose();
          }
        })
    }
    
  }

  return (
    <ModalFormLayout
      formTitle={'UPDATE USER'}
      buttonTitle={'UPDATE'}
      handleSubmit={handleSubmitUpdate}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Grid container>
        <Typography variant="subtitle1" gutterBottom sx={{width: '100%'}}>
          {userEmail}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{width: '100%'}}>
          {userFullName}
        </Typography>
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="select-role-label">Role</InputLabel>
          <Select
            labelId="select-role-label"
            id="select-role"
            value={selectRoleName}
            label="Role"
            onChange={handleSelectRole}
          >
            {roles.map((role) => (
              <MenuItem
                key={role.id}
                value={role.name}
              >
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </ModalFormLayout>
  );
}
