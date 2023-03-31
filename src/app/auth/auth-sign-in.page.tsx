import { useNavigate } from "react-router-dom";
import { Grid, Avatar, Typography, Box, TextField, Button } from "@mui/material";

// ============== Yup ==============
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignIn } from "./auth-schemas.yap";
import { Controller, FieldValues, useForm } from "react-hook-form";

// ============== Redux ==============
import { useAppDispatch } from "hooks/redux";
import { signInUser } from "./store/auth.actions";
import { useAuthSelector } from "./store/auth.selectors";

// ============== Components ==============
import ErrorAlert from "components/error-alert.component";

// ============== Types ==============
import { SignInDto } from "./types/sign-in-dto.type";

// ============== Icons ==============
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

export default function AuthSignInPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAuthSelector();
  const color = "#1976d2";

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaSignIn),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmitForm = (data: FieldValues) => {
    const dto: SignInDto = {
      email: data.email,
      password: data.password,
    };

    dispatch(signInUser({ dto })).then(({ meta }) => {
      if (meta.requestStatus !== "rejected") {
        reset();
        navigate("/", { replace: true });
      }
    });
  };

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
          <LoginOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            Sign in
          </Button>
          {auth.errors.token && <ErrorAlert title="Error" text={auth.errors.token} />}
        </Box>
      </Grid>
    </Grid>
  );
}