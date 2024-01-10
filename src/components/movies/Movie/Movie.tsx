'use client'

import type {ContainerFactory, Styles} from '@mantine/core'
import {Box, Container, useMantineTheme} from '@mantine/core'
import {toNumber} from 'lodash'
import {useParams} from 'next/navigation'
import * as React from 'react'

import {useGetMovieMovieId} from '@/lib/data-provider/TMDB/__generated'
import type {MovieSearchResult} from '@/lib/data-provider/TMDB/types/search/movies'
import {createMoviePosterUrl} from '@/utils/movie'

function useMovieState() {
    const params = useParams<{id: string}>()
    const id = toNumber(params.id)
    const movieByIdQuery = useGetMovieMovieId<MovieSearchResult>(id)
    const movie = movieByIdQuery.data
    const isLoading = movieByIdQuery.isLoading
    return {movie: {...movie, isLoading}}
}

const createContainerStyles: Styles<ContainerFactory> = () => ({
    root: {
        overflow: 'hidden',
    },
})

export const Movie: React.FC = () => {
    const state = useMovieState()
    const posterUrl = createMoviePosterUrl(state.movie.poster_path)
    const theme = useMantineTheme()
    const containerStyles = createContainerStyles(theme, {}, undefined)

    const content = (() => {
        return (
            <React.Fragment>
                <Box
                    alt={state.movie.overview}
                    component='img'
                    maw='200px'
                    src={posterUrl}
                />
                <pre style={{textOverflow: 'ellipsis'}}>
                    {JSON.stringify(state.movie, null, 2)}
                </pre>
            </React.Fragment>
        )
    })()
    return (
        <Container py={20} styles={containerStyles}>
            {content}
        </Container>
    )
}
