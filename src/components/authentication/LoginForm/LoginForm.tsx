'use client'

import * as React from 'react'
import {FormProvider, useForm} from 'react-hook-form'

import {LoginFormView} from './LoginFormView'

function useLoginFormState() {
    const form = useForm()
    return {form}
}

export const LoginForm: React.FC = () => {
    const state = useLoginFormState()

    return (
        <FormProvider {...state.form}>
            <LoginFormView />
        </FormProvider>
    )
}
