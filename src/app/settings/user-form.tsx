import {
    Box,
    Button,
    CssBaseline,
    Grid,
    Paper,
    TextField,
    Typography,
    Link,
    FormControlLabel, Checkbox
} from '@mui/material';
import React from "react";

type PropsType = {
    handleSubmit: React.FormEventHandler<HTMLFormElement>,
}

const UserForm = ({handleSubmit} : PropsType) => {


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
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    Change password
                    <Typography component="h1" variant="h5">
                    </Typography>
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
                            id="current_password"
                            label="current password"
                            name="current_password"
                            autoComplete="current_password"
                            autoFocus
                            type='password'
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="new_password"
                            label="new password"
                            name="new_password"
                            autoComplete="new_password"
                            type='password'
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirm_password"
                            label="confirm password"
                            id="confirm_password"
                            autoComplete="confirm_password"
                            type='password'
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
                            submit
                        </Button>
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
                </Box>
            </Grid>
        </Grid>
    )
}

export default UserForm;