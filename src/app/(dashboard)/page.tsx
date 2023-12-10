import {Container, Text} from '@mantine/core'
import * as React from 'react'

import {constructMetadata} from '@/utils/constructMetadata'

export const metadata = constructMetadata({
    title: 'Dashboard',
})

const Page: React.FC = () => {
    return (
        <Container py={25}>
            <Text ta='center'>Hello World!</Text>
        </Container>
    )
}

export default Page
