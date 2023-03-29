import { useAppDispatch } from "../../hooks/redux";
import { useRoleSelector } from "app/roles/store/roles.selectors";
import { useEffect, useState } from "react";
import { Box, FormHelperText, Grid, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import ModalFormLayout from "components/form-modal-layout.component";
import { ModalFormRoleProps } from "app/types/props.type";
import { getRoles } from "app/roles/store/roles.actions";
import { assignRoleOnUser, getUserById } from "./store/users.actions";
import { useUserSelector } from "./store/users.selectors";
import { UserAssignRoleDto } from "./types/user-assign-role-dto.type";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaUserRole } from "./users-schemas.yap";


export default function ModalUserForm({ id, isOpen, handleClose }: ModalFormRoleProps) {
  const dispatch = useAppDispatch();

  const { roles } = useRoleSelector();
  const { user } = useUserSelector();

  const [userFullName, setUserFullName] = useState<string>('user name');
  const [userEmail, setUserEmail] = useState<string>('user email');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaUserRole)
  });

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
      setValue('role', user.roleName)
    }
  }, [user]);

  const handleSubmitUpdate = (data: FieldValues) => {
    const role = roles.find((role) => role.name === data.role)
    if (role) {
      const dto: UserAssignRoleDto = {
        name: data.role,
        type: role.type
      }
      const userId = String(id);
      dispatch(assignRoleOnUser({ id: userId, dto }))
        .then(({ meta }) => {
          if (meta.requestStatus !== 'rejected') {
            reset();
            handleClose();
          }
        })
    }
  }

  return (
    <ModalFormLayout
      formTitle={'UPDATE USER'}
      buttonTitle={'UPDATE'}
      handleSubmit={handleSubmit(handleSubmitUpdate)}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Grid container>
        <Typography variant="subtitle1" gutterBottom sx={{ width: '100%' }}>
          {userEmail}
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ width: '100%' }}>
          {userFullName}
        </Typography>
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        <Controller
          name="role"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Select
                sx={{ width: '100%' }}
                error={errors.type ? true : false}
                value={value ? value : ''}
                onChange={onChange}
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
              <FormHelperText
                sx={{ color: 'red' }}
              >
                {errors.role ? `${errors.role.message}` : ''}
              </FormHelperText>
            </>
          )}
        />
      </Box>
    </ModalFormLayout>
  );
}
