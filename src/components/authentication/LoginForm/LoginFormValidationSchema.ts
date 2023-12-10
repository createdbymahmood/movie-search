import * as Yup from 'yup'

export const loginFormValidationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
})
