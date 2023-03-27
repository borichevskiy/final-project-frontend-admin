import { useAppDispatch } from "../../hooks/redux";
import { addRole, getRoleById, updateRole } from "./store/roles.actions";
import { useRoleSelector } from "./store/roles.selectors";
import { useEffect, useState } from "react";
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { CreateRoleDto } from "./types/create-role-dto.type";
import { UserRoleTypes } from "./enums/user-role-types.enum";
import { UserPermissions } from "./enums/user-permissions.enum";
import { useNavigate } from "react-router-dom";
import ModalFormLayout from "components/form-modal-layout.component";
import { ModalFormRoleProps } from "app/types/props.type";

export default function ModalRoleForm({ id, isOpen, handleClose }: ModalFormRoleProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formTitle, setFormTitle] = useState<string>('CREATE ROLE');
  const [buttonTitle, setButtonTitle] = useState<string>('CREATE');

  const { role } = useRoleSelector();

  const [roleName, setRoleName] = useState<string>('');
  const [selectRoleType, setRoleType] = useState<UserRoleTypes>(UserRoleTypes.Client);
  const [permissions, setPermissions] = useState<UserPermissions[]>([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    if (id) {
      const roleId = Number(id);
      setFormTitle('UPDATE ROLE');
      setButtonTitle('UPDATE');
      dispatch(getRoleById({ id: roleId }));
    } else {
        setFormTitle('CREATE ROLE');
        setButtonTitle('CREATE');
        setRoleName('');
        setRoleType(UserRoleTypes.Client);
        setPermissions([]);
    }
  }, [id]);

  useEffect(() => {
    if (role) {
      setRoleName(role.name);
      setRoleType(role.type);
      if (role.permissions.length === 0)
        setPermissions([UserPermissions.All]);
      else
        setPermissions(role.permissions);
    }
  }, [role]);

  const handleSelectRoleType = (event: SelectChangeEvent) => {
    const indexOfS = Object.values(UserRoleTypes).indexOf(event.target.value as unknown as UserRoleTypes);
    setRoleType(Object.values(UserRoleTypes)[indexOfS]);
  };

  const handleSelectPermissions = (event: SelectChangeEvent<typeof permissions>) => {
    const { target: { value } } = event;
    const values = typeof value === 'string' ? value.split(',') : value;
    const returnedPermmisions = values.map((permission) => {
      const indexOfS = Object.values(UserPermissions).indexOf(permission as unknown as UserPermissions);
      return Object.values(UserPermissions)[indexOfS];
    })
    setPermissions(returnedPermmisions);
  };

  const handleSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTarget = event.currentTarget;

    const data = new FormData(event.currentTarget);
    const name: string = String(data.get('roleName'));
    const dto: CreateRoleDto = {
      name, type: selectRoleType, permissions
    };

    dispatch(addRole({ dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          currentTarget.reset();
          navigate(0);
        }
      })
  }

  const handleSubmitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTarget = event.currentTarget;

    const data = new FormData(event.currentTarget);
    const name: string = String(data.get('roleName'));
    const dto: CreateRoleDto = {
      name, type: selectRoleType, permissions
    };
    const roleId = Number(id);
    dispatch(updateRole({ id: roleId, dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          currentTarget.reset();
          navigate(0);
        }
      })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (id)
      handleSubmitUpdate(event);
    else
      handleSubmitCreate(event);
  }

  return (
    <ModalFormLayout
      formTitle={formTitle}
      buttonTitle={buttonTitle}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <TextField
        margin="normal"
        label="Role name"
        name="roleName"
        fullWidth
        value={roleName}
        onChange={(event) => setRoleName(event.target.value)}
      />
      <Box sx={{ marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="select-role-type-label">Role type</InputLabel>
          <Select
            labelId="select-role-type-label"
            id="select-role-type"
            value={selectRoleType}
            label="Role type"
            onChange={handleSelectRoleType}
          >
            {Object.values(UserRoleTypes).map((roleType) => (
              <MenuItem
                key={roleType}
                value={roleType}
              >
                {roleType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="select-permissions-label">Permissions</InputLabel>
          <Select
            labelId="select-permissions-label"
            id="select-permissions"
            multiple
            value={permissions}
            onChange={handleSelectPermissions}
            input={<OutlinedInput id="select-multiple-permissions" label="Permissions" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {Object.values(UserPermissions).map((permission, index) => (
              <MenuItem
                key={permission}
                value={permission}
              >
                {permission}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </ModalFormLayout>
  );
}
