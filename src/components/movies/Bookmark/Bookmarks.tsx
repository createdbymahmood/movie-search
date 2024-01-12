'use client'

import {Container, Grid, Text, useMantineTheme} from '@mantine/core'
import type {UseQueryResult} from '@tanstack/react-query'
import {map, some} from 'lodash'
import {join, pipe, reduce} from 'lodash/fp'
import * as React from 'react'

import {useBookmarksInLocalStorage} from '@/components/movies/Bookmark/useBookmarksInLocalStorage'
import {MovieCard} from '@/components/movies/MovieSearch/MovieCard'
import {MovieSearchSkeleton} from '@/components/movies/MovieSearch/MovieSearchSkeleton'
import type {ErrorType} from '@/lib/axios'
import type {
    GetMovieMovieId401,
    GetMovieMovieId404,
} from '@/lib/data-provider/TMDB/__generated'
import type {MovieSearchResult} from '@/lib/data-provider/TMDB/types/search/movies'
import type {MovieQueryOptions} from '@/lib/data-provider/TMDB/useGetIds'
import {useGetMovieMovieIds} from '@/lib/data-provider/TMDB/useGetIds'
import {toClientErrorMessage} from '@/utils/error'

type MovieQuery = UseQueryResult<
    MovieSearchResult,
    ErrorType<GetMovieMovieId401 | GetMovieMovieId404>
>

const createNormalizedErrorMessages = pipe(
    reduce((prev: string[], curr: MovieQuery) => {
        if (!curr.error) return prev.concat('')
        return prev.concat(toClientErrorMessage(curr.error))
    }, [] as string[]),
    join(', '),
)

function useBookmarksState() {
    const theme = useMantineTheme()
    const [bookmarks] = useBookmarksInLocalStorage()

    const moviesQuery = useGetMovieMovieIds(bookmarks, {
        query: {suspense: false} as unknown as MovieQueryOptions,
    })

    const moviesQueriesData = map(
        moviesQuery,
        (query) => query.data ?? ([] as unknown as MovieSearchResult),
    )
    const isLoading = some(moviesQuery, 'isLoading')
    const isError = some(moviesQuery, 'isError')
    const error = createNormalizedErrorMessages(moviesQuery)

    return {
        bookmarks,
        theme,
        moviesQuery: {isLoading, data: moviesQueriesData, isError, error},
    }
}

export const MoviesGridLoadingFallback = () => {
    const theme = useMantineTheme()

    return (
        <Container py={theme.spacing.lg}>
            <MovieSearchSkeleton />
        </Container>
    )
}

const Bookmarks: React.FC = () => {
    const state = useBookmarksState()

    const content = (() => {
        if (state.moviesQuery.isLoading) return <MovieSearchSkeleton />

        if (state.moviesQuery.isError)
            return <Text>{toClientErrorMessage(state.moviesQuery.error)}</Text>

        if (!state.moviesQuery.data.length)
            return <Text>No Bookmarks found</Text>

        return (
            <Grid>
                {state.moviesQuery.data.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </Grid>
        )
    })()

    return <Container py={state.theme.spacing.lg}>{content}</Container>
}

export default Bookmarks
