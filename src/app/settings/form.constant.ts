import * as yup from 'yup';

export const schema = yup
    .object()
    .shape({
        current_password: yup.string().email('Right correct email').required('Login is a required field'),
        password: yup
            .string()
            .required('Password is a required field')
            .min(5, 'Min 5 symbols')
            .matches(/^[0-9a-zA-Z]{5,}$/, 'Password incorrect'),
    })
    .required();