'use client'

import {Container, Grid, Skeleton, Stack} from '@mantine/core'
import {range} from 'lodash'
import * as React from 'react'

export const MovieSearchSkeleton: React.FC = () => {
    return (
        <Container>
            <Stack
                display='flex'
                h='100vh'
                py={50}
                style={{flexDirection: 'column'}}
            >
                <Grid>
                    {range(10).map((index) => (
                        <Grid.Col
                            key={index}
                            span={{lg: 3, md: 4, sm: 6, xs: 12}}
                        >
                            <Skeleton height={200} width='100%' />
                        </Grid.Col>
                    ))}
                </Grid>
            </Stack>
        </Container>
    )
}
