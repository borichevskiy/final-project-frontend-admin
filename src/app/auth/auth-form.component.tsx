import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { FormPropsType } from './types/form-props.type';

const Form = ({ title, nameBtn, handleSubmit }: FormPropsType) => {
  const color = '#1976d2';
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        container
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: color,
            color: 'white'
          }}
        >
          <LoginOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Grid
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
            label="Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: '20px',
              backgroundColor: color,
              '&:hover': {
                backgroundColor: color,
                color: 'white',
              }
            }}
          >
            {nameBtn}
          </Button>
          <Grid container>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Form;