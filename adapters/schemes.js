import * as yup from 'yup';

export const registrationSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    gender: yup.string().required(),
    birth_date: yup.string().required(),
    region: yup.string().required()
})
