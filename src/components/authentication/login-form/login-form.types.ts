import type * as Yup from 'yup'

import type {loginFormValidationSchema} from '@/components/authentication/login-form/login-form-validation-schema'

export interface FormValues
  extends Yup.InferType<typeof loginFormValidationSchema> {}
