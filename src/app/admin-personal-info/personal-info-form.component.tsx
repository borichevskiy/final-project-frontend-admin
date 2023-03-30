import React, {useEffect, useState} from "react";
import {
    Grid,
    CssBaseline,
    Paper,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Link
} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux";
import {getUserInfo, updateUserInfo} from "./store/personal-info.actions";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { UpdateAdminInfoDtoType } from "./types/update-admin-info-dto.type";
import { schemaPersonalInfo } from "./personal-info-schema.yap";
import { yupResolver } from "@hookform/resolvers/yup";

const PersonalInfoForm = () => {
    const dispatch = useAppDispatch();
    const [disabled, setDisabled] = useState(true);

    const {
      handleSubmit,
      control,
      formState: { errors },
      setValue
    } = useForm({
      mode: 'all', 
      resolver: yupResolver(schemaPersonalInfo),
      defaultValues: {firstname: '', lastname: '', phone: '', address: ''}
    });

    useEffect(() => {
      dispatch(getUserInfo())
        .then ((data) => {
          setValue('firstname', data.payload.firstName);
          setValue('lastname', data.payload.lastName);
          setValue('phone', data.payload.phone);
          setValue('address', data.payload.address);
      })
    }, [dispatch])

    const handleSubmitForm = (data: FieldValues) => {
      const dto: UpdateAdminInfoDtoType = {
        firstName: data.firstname, 
        lastName: data.lastname, 
        phone: data.phone, 
        address: data.address
      };

      dispatch(updateUserInfo({dto}))
        .then(({meta}) => {
          if (meta.requestStatus !== 'rejected') {
            setDisabled(true);
          }
        })
    }


  return (
      <Grid container sx={{justifyContent: 'center'}}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
                Your personal information
            </Typography>
              <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(handleSubmitForm)}
                  sx={{ mt: 1 }}
              >
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      helperText={errors.firstname ? `${errors.firstname.message}`: ''}
                      margin="normal"
                      fullWidth
                      id="firstname"
                      value={value}
                      disabled={disabled}
                      onChange={onChange}
                      error={errors.firstname ? true : false}
                    />
                  )}
                />
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      helperText={errors.lastname ? `${errors.lastname.message}`: ''}
                      margin="normal"
                      fullWidth
                      id="lastname"
                      value={value}
                      disabled={disabled}
                      onChange={onChange}
                      error={errors.lastname ? true : false}
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      helperText={errors.phone ? `${errors.phone.message}`: ''}
                      margin="normal"
                      fullWidth
                      id="phone"
                      value={value}
                      disabled={disabled}
                      onChange={onChange}
                      error={errors.phone ? true : false}
                    />
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      helperText={errors.address ? `${errors.address.message}`: ''}
                      margin="normal"
                      fullWidth
                      id="address"
                      value={value}
                      disabled={disabled}
                      onChange={onChange}
                      error={errors.address ? true : false}
                    />
                  )}
                />
                <FormControlLabel 
                  control={
                    <Checkbox checked={!disabled}/>
                  } 
                  label="Update info" 
                  onChange={()=> setDisabled(!disabled)} 
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: '20px',
                    backgroundColor: '#6e5f55'
                  }}
                >
                  Save
                </Button>
              </Box>
              <Grid container>
                <Grid
                  container
                  item
                  sx={{marginTop: '30px'}}
                >
                  <Link
                    href="/"
                    style={{
                      textDecoration: 'none',
                      color: 'white'
                    }}
                  >
                  </Link>
                </Grid>
              </Grid>
           </Box>
         </Grid>
       </Grid>
  )
}

export default PersonalInfoForm;