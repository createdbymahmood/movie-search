import {Button, Paper, PasswordInput, TextInput, Title} from '@mantine/core'
import * as React from 'react'

import classes from './LoginFormView.module.css'

export const LoginFormView: React.FC = () => {
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} p={30} radius={0}>
                <Title
                    className={classes.title}
                    mb={50}
                    mt='md'
                    order={2}
                    ta='center'
                >
                    Welcome back to Mantine!
                </Title>

                <TextInput
                    label='Email address'
                    placeholder='hello@gmail.com'
                    size='md'
                />
                <PasswordInput
                    label='Password'
                    mt='md'
                    placeholder='Your password'
                    size='md'
                />
                <Button mt='xl' size='md' fullWidth>
                    Login
                </Button>
            </Paper>
        </div>
    )
}
