'use client'

import {Grid, Skeleton} from '@mantine/core'
import {range} from 'lodash'
import * as React from 'react'

export const MovieSearchSkeleton: React.FC = () => {
    return (
        <Grid>
            {range(10).map((index) => (
                <Grid.Col key={index} span={{lg: 3, md: 4, sm: 6, xs: 12}}>
                    <Skeleton height={200} width='100%' />
                </Grid.Col>
            ))}
        </Grid>
    )
}
