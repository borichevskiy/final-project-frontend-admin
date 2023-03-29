import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { FormPropsType } from "./types/form-props.type";
import { Controller } from "react-hook-form";

const Form = ({
  title,
  nameBtn,
  handleSubmit,
  handleSubmitForm,
  isSignIn,
  control,
  errors,
}: FormPropsType) => {
  const color = "#1976d2";

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        container
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: color,
            color: "white",
          }}
        >
          {isSignIn ? <LoginOutlinedIcon /> : <LockOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleSubmitForm)}
          sx={{ mt: 1 }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                helperText={errors.email ? `${errors.email.message}` : ""}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                error={errors.email ? true : false}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                helperText={errors.password ? `${errors.password.message}` : ""}
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                id="password"
                error={errors.password ? true : false}
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: "20px",
              backgroundColor: color,
              "&:hover": {
                backgroundColor: color,
                color: "white",
              },
            }}
          >
            {nameBtn}
          </Button>
          <Grid container></Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Form;
