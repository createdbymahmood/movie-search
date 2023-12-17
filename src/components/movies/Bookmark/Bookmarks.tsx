'use client'
import {Container, Grid, Text} from '@mantine/core'
import type {UseQueryOptions} from '@tanstack/react-query'
import * as React from 'react'

import {useBookmarksInLocalStorage} from '@/components/movies/Bookmark/useBookmarksInLocalStorage'
import {MovieCard} from '@/components/movies/MovieSearch/MovieCard'
import {MovieSearchSkeleton} from '@/components/movies/MovieSearch/MovieSearchSkeleton'
import type {ErrorType} from '@/lib/axios'
import type {MovieDetails} from '@/lib/data-provider/OMDB/types'
import {useGetIds} from '@/lib/data-provider/OMDB/useGetIds'
import {toClientErrorMessage} from '@/utils/error'

type GetIdsQueryOptions = Partial<
    UseQueryOptions<MovieDetails[], ErrorType<unknown>, MovieDetails[]>
>

function useBookmarksState() {
    const [bookmarks] = useBookmarksInLocalStorage()

    const bookmarkedMovies = useGetIds(
        {Ids: bookmarks},
        {query: {suspense: false} as GetIdsQueryOptions},
    )

    return {bookmarks, bookmarkedMovies}
}
export const BookmarksLoadingFallback = () => (
    <Container py={20}>
        <MovieSearchSkeleton />
    </Container>
)

const Bookmarks: React.FC = () => {
    const state = useBookmarksState()

    const content = (() => {
        if (state.bookmarkedMovies.isLoading) return <MovieSearchSkeleton />
        if (state.bookmarkedMovies.error)
            return (
                <Text>
                    {toClientErrorMessage(state.bookmarkedMovies.error)}
                </Text>
            )

        if (!state.bookmarkedMovies.data?.length)
            return <Text>No Bookmarks found</Text>

        return (
            <Grid>
                {state.bookmarkedMovies.data.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </Grid>
        )
    })()

    return <Container py={20}>{content}</Container>
}

export default Bookmarks
