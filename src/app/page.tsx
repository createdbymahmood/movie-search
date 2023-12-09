import {Button, Container, Text} from '@mantine/core'
import * as React from 'react'

interface UsePageStateParams {}

function usePageState(params: UsePageStateParams = {}) {
    return undefined
}

export interface PageProps {}

const Page: React.FC<PageProps> = (props) => {
    const state = usePageState()

    return (
        <div>
            <Container py={25}>
                <Text ta='center'>Hello World!</Text>
            </Container>
        </div>
    )
}

export default Page
