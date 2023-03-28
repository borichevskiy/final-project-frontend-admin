import { useAppDispatch } from "../../hooks/redux";
import { useEffect, useState } from "react";
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import ModalFormLayout from "components/form-modal-layout.component";
import { ModalFormRoleProps } from "app/types/props.type";
import { getUserById, updateUserStatus } from "./store/users.actions";
import { useUserSelector } from "./store/users.selectors";
import { UpdateUserStatusDto } from "./types/user-status-dto.type";

export default function ModalStatusForm({ id, isOpen, handleClose }: ModalFormRoleProps) {
  const dispatch = useAppDispatch();

  const { user } = useUserSelector();

  const [userEmail, setUserEmail] = useState<string>('user email');
  const [userStatus, setUserStatus] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const userId = String(id);
      dispatch(getUserById({ id: userId }));
    } 
  }, [id]);

  useEffect(() => {
    if (user) {
      setUserStatus(user.status);
      setUserEmail(user.email);
    }
  }, [user]);

  const handleSubmitUpdateStatus = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentTarget = event.currentTarget;
    const dto : UpdateUserStatusDto = {
      status: userStatus
    }
    const userId = String(id);
    dispatch( updateUserStatus({id: userId, dto}))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          currentTarget.reset();
          handleClose();
        }
      })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'true')
      setUserStatus(true);
    else 
      setUserStatus(false);
  };

  return (
    <ModalFormLayout
      formTitle={'UPDATE USER STATUS'}
      buttonTitle={'SAVE'}
      handleSubmit={handleSubmitUpdateStatus}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Grid container>
        <Typography variant="subtitle1" gutterBottom sx={{width: '100%'}}>
          {userEmail}
        </Typography>
      </Grid>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={userStatus}
          onChange={handleChange}
        >
          <FormControlLabel value={true} control={<Radio />} label="Active" />
          <FormControlLabel value={false} control={<Radio />} label="Inactive" />
        </RadioGroup>
      </FormControl>
    </ModalFormLayout>
  );
}
