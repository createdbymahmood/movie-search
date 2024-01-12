'use client'

import {Container, useMantineTheme} from '@mantine/core'

import {MovieSearchSkeleton} from '@/components/movies/MovieSearch/MovieSearchSkeleton'

export default function Loading() {
    const theme = useMantineTheme()

    return (
        <Container py={theme.spacing.lg}>
            <MovieSearchSkeleton />
        </Container>
    )
}
