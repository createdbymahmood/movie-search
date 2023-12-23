'use client'

import {Container, Grid, Text, useMantineTheme} from '@mantine/core'
import {reduce, some} from 'lodash'
import * as React from 'react'

import {useBookmarksInLocalStorage} from '@/components/movies/Bookmark/useBookmarksInLocalStorage'
import {MovieCard} from '@/components/movies/MovieSearch/MovieCard'
import {MovieSearchSkeleton} from '@/components/movies/MovieSearch/MovieSearchSkeleton'
import type {MovieSearchResult} from '@/lib/data-provider/TMDB/types/search/movies'
import {useGetMovieMovieIds} from '@/lib/data-provider/TMDB/useGetIds'
import {toClientErrorMessage} from '@/utils/error'

function useBookmarksState() {
    const [bookmarks] = useBookmarksInLocalStorage()

    const moviesQuery = useGetMovieMovieIds(bookmarks, {
        /* @ts-ignore because of some uknown TS errors */
        query: {suspense: false},
    })
    const theme = useMantineTheme()
    const moviesQueriesData = moviesQuery.map(
        (query) => query.data ?? ([] as unknown as MovieSearchResult),
    )
    const isLoading = some(moviesQuery, 'isLoading')
    const isError = some(moviesQuery, 'isError')
    const error = reduce(
        moviesQuery,
        (prev, curr) => prev.concat(toClientErrorMessage(curr.error)),
        '',
    )

    return {
        bookmarks,
        moviesQueriesData,
        theme,
        moviesQuery: {
            isLoading,
            data: moviesQueriesData,
            isError,
            error,
        },
    }
}

export const BookmarksLoadingFallback = () => {
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
