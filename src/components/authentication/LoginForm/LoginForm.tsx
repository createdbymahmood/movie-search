'use client'

import {yupResolver} from '@hookform/resolvers/yup'
import {useRouter} from 'next/navigation'
import {signIn} from 'next-auth/react'
import * as React from 'react'
import {FormProvider, useForm} from 'react-hook-form'

import {loginFormValidationSchema} from '@/components/authentication/LoginForm/LoginFormValidationSchema'
import type {NextAuthError} from '@/utils/error'
import {transformNextAuthErrorToReadableMessages} from '@/utils/error'

import type * as LoginFormTypes from './LoginForm.types'
import {LoginFormView} from './LoginFormView'

function useLoginFormState() {
    const form = useForm<LoginFormTypes.FormValues>({
        resolver: yupResolver(loginFormValidationSchema),
    })
    const router = useRouter()

    const onSubmit: React.ComponentProps<
        typeof LoginFormView
    >['onSubmit'] = async (values) => {
        const response = await signIn('credentials', {
            ...values,
            redirect: false,
        })

        router.push('/')

        if (response?.error) {
            const message = transformNextAuthErrorToReadableMessages(
                response.error as NextAuthError,
            )
            form.setError('email', {message})
        }
    }

    return {form: {...form, onSubmit}, router}
}

export const LoginForm: React.FC = () => {
    const state = useLoginFormState()

    return (
        <FormProvider {...state.form}>
            <LoginFormView onSubmit={state.form.onSubmit} />
        </FormProvider>
    )
}
