import type * as Yup from 'yup'

import type {loginFormValidationSchema} from '@/components/authentication/LoginForm/LoginFormValidationSchema'

export interface FormValues
    extends Yup.InferType<typeof loginFormValidationSchema> {}
