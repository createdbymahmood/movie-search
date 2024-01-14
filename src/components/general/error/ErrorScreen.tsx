import {Button, Container, Group, Text, Title} from '@mantine/core'
import type {ErrorProps} from 'next/error'

import {toClientErrorMessage} from '@/utils/error'

import classes from './ErrorScreen.module.css'

export default function ErrorScreen(props: {
    error: ErrorProps
    reset: () => void
}) {
    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.label}>500</div>
                <Title className={classes.title}>
                    {toClientErrorMessage(props.error)}
                </Title>
                <Text className={classes.description} size='lg' ta='center'>
                    Our servers could not handle your request. Don&apos;t worry,
                    our development team was already notified. Try refreshing
                    the page.
                </Text>
                <Group justify='center'>
                    <Button size='md' variant='white' onClick={props.reset}>
                        Refresh the page
                    </Button>
                </Group>
            </Container>
        </div>
    )
}
