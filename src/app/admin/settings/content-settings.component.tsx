import React from "react";
import { PropsType } from "../types/types";
import { Grid, CssBaseline, Paper, Box, Typography, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";

export default function ContentSettingsAdminPage({ handleSubmit }: PropsType) {
  const [disabled, setDisabled] = React.useState(true);

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Your personal information
          <Typography component="h1" variant="h5"></Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
              disabled={disabled}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="firstname"
              name="firstname"
              autoComplete="firstname"
              disabled={disabled}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="lastname"
              id="lastname"
              autoComplete="lastname"
              disabled={disabled}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="phone"
              id="phone"
              autoComplete="phone"
              disabled={disabled}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="address"
              id="address"
              autoComplete="address"
              disabled={disabled}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Update info"
              onChange={() => setDisabled(!disabled)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: "20px",
                backgroundColor: "#6e5f55",
              }}
            >
              submit
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}