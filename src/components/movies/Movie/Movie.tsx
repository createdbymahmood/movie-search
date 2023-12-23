'use client'

import type {ContainerFactory, Styles} from '@mantine/core'
import {Box, Container, Loader, useMantineTheme} from '@mantine/core'
import {toNumber} from 'lodash'
import {useParams} from 'next/navigation'
import * as React from 'react'

import {AppErrorBoundary} from '@/components/general/AppErrorBoundary'
import {useGetMovieMovieId} from '@/lib/data-provider/TMDB/__generated'
import type {MovieSearchResult} from '@/lib/data-provider/TMDB/types/search/movies'
import {createMoviePosterUrl} from '@/utils/movie'

function useMovieState() {
    const params = useParams<{id: string}>()
    const id = toNumber(params.id)
    const movieByIdQuery = useGetMovieMovieId<MovieSearchResult>(id)
    const movie = movieByIdQuery.data
    return {movie}
}

const createContainerStyles: Styles<ContainerFactory> = () => ({
    root: {
        overflow: 'hidden',
    },
})

const MovieImpl: React.FC = () => {
    const state = useMovieState()
    const posterUrl = createMoviePosterUrl(state.movie?.poster_path)
    const theme = useMantineTheme()
    const containerStyles = createContainerStyles(theme, {}, undefined)

    return (
        <Container py={20} styles={containerStyles}>
            <Box
                alt={state.movie?.overview}
                component='img'
                maw='200px'
                src={posterUrl}
            />
            <pre style={{textOverflow: 'ellipsis'}}>
                {JSON.stringify(state.movie, null, 2)}
            </pre>
        </Container>
    )
}

export const Movie: React.FC = () => {
    return (
        <React.Suspense fallback={<Loader />}>
            <AppErrorBoundary>
                <MovieImpl />
            </AppErrorBoundary>
        </React.Suspense>
    )
}
