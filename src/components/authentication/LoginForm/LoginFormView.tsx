import {Button, Paper, PasswordInput, TextInput, Title} from '@mantine/core'
import {capitalize} from 'lodash'
import * as React from 'react'
import type {SubmitHandler} from 'react-hook-form'
import {useFormContext} from 'react-hook-form'

import type * as LoginFormTypes from './LoginForm.types'
import classes from './LoginFormView.module.css'

function useLoginFormViewState() {
    const form = useFormContext<LoginFormTypes.FormValues>()
    const isSubmitting = form.formState.isSubmitting
    return {form: {...form, isSubmitting}}
}

interface LoginFormViewProps {
    onSubmit: SubmitHandler<LoginFormTypes.FormValues>
}

export const LoginFormView: React.FC<LoginFormViewProps> = ({onSubmit}) => {
    const state = useLoginFormViewState()

    return (
        <form
            className={classes.wrapper}
            onSubmit={state.form.handleSubmit(onSubmit)}
        >
            <Paper className={classes.form} p={30} radius={0}>
                <Title
                    className={classes.title}
                    mb={50}
                    mt='md'
                    order={2}
                    ta='center'
                >
                    Welcome back
                </Title>

                <TextInput
                    label='Email address'
                    placeholder='hello@gmail.com'
                    size='md'
                    {...state.form.register('email')}
                    error={capitalize(
                        state.form.formState.errors.email?.message,
                    )}
                />
                <PasswordInput
                    label='Password'
                    mt='md'
                    placeholder='Your password'
                    size='md'
                    {...state.form.register('password')}
                    error={capitalize(
                        state.form.formState.errors.password?.message,
                    )}
                />
                <Button
                    disabled={state.form.isSubmitting}
                    loading={state.form.isSubmitting}
                    mt='xl'
                    size='md'
                    type='submit'
                    fullWidth
                >
                    Login
                </Button>
            </Paper>
        </form>
    )
}
