'use client'

import {AspectRatio, Grid, Skeleton} from '@mantine/core'
import {range} from 'lodash'
import * as React from 'react'

export const MovieSearchSkeleton: React.FC = () => {
    return (
        <Grid>
            {range(10).map((index) => (
                <Grid.Col key={index} span={{lg: 3, md: 4, sm: 6, xs: 12}}>
                    <AspectRatio maw={300} mx='auto' ratio={720 / 1080}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Skeleton animate={false} height={200} width='100%' />
                    </AspectRatio>

                    <Skeleton animate={false} h={24.8} mt={5} />
                    <Skeleton animate={false} h={24.8} mt={5} />
                    <Skeleton animate={false} h={36} mt='md' />
                </Grid.Col>
            ))}
        </Grid>
    )
}
