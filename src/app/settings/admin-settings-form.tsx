import {
    Box,
    Button,
    CssBaseline,
    Grid,
    Paper,
    TextField,
    Typography,
    Link,
} from '@mui/material';

// ============ Redux =========================
import { useAppDispatch } from 'hooks/redux';
import { updateUserPassword } from './store/settings.actions';
import { useUserSettingsSelector } from './store/settings.selectors';

// ============ Yup =========================
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { UpdateUserPasswordDtoType } from './types/update-user-password-dto.type';
import { schemaUpdatePassword } from './admin-settings-schema.yup';
import { yupResolver } from '@hookform/resolvers/yup';

// ============ Components =========================
import ErrorAlert from 'components/error-alert.component';

const UserSettingsForm = () => {
    const dispatch = useAppDispatch();
    const settings = useUserSettingsSelector();
    
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm({
        mode: 'all', 
        resolver: yupResolver(schemaUpdatePassword),
        defaultValues: {currentPassword: '', newPassword: '', confirmPassword: ''}
    });

    const handleSubmitForm = (data: FieldValues) => {
        const dto: UpdateUserPasswordDtoType = {
            password: data.currentPassword, 
            newPassword: data.newPassword, 
            newPasswordConfirm: data.confirmPassword};
        dispatch(updateUserPassword({dto}))
            .then(({meta}) => {
                if (meta.requestStatus !== 'rejected') {
                    reset();
                }
            })
    }

    return (
        <>
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
                        <Typography component="h1" variant="h5">
                            Change password
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(handleSubmitForm)}
                            sx={{ mt: 1 }}
                        >
                            <Controller
                                name="currentPassword"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                    helperText={errors.currentPassword ? `${errors.currentPassword.message}`: ''}
                                    margin="normal"
                                    label="Current Password"
                                    fullWidth
                                    id="currentPassword"
                                    type='password'
                                    value={value ? value : ''}
                                    onChange={onChange}
                                    error={errors.currentPassword ? true : false}
                                    />
                                )}
                            />
                            <Controller
                                name="newPassword"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                    helperText={errors.newPassword ? `${errors.newPassword.message}`: ''}
                                    margin="normal"
                                    label="New Password"
                                    fullWidth
                                    id="newPassword"
                                    type='password'
                                    value={value ? value : ''}
                                    onChange={onChange}
                                    error={errors.newPassword ? true : false}
                                    />
                                )}
                            />
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                    helperText={errors.confirmPassword ? `${errors.confirmPassword.message}`: ''}
                                    margin="normal"
                                    label="Confirm Password"
                                    fullWidth
                                    id="confirmPassword"
                                    type='password'
                                    value={value ? value : ''}
                                    onChange={onChange}
                                    error={errors.confirmPassword ? true : false}
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
                                    borderRadius: '20px',
                                    backgroundColor: '#6e5f55'
                                }}
                            >
                                Save
                            </Button>
                            { settings.errors.userSettings && 
                                <ErrorAlert title="Error" text={settings.errors.userSettings}/> 
                            }
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default UserSettingsForm;