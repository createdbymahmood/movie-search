'use client'

import {Center, Grid, Pagination, Text} from '@mantine/core'
import {isEmpty} from 'lodash'
import * as React from 'react'

import {MovieCard} from '@/components/movies/MovieSearch/MovieCard'
import {toClientErrorMessage} from '@/utils/error'

import {useMovieSearchState} from './useMovieSearchState'

export const MovieSearchContent: React.FC = () => {
    const state = useMovieSearchState()

    const content = (() => {
        if (isEmpty(state.searchQuery)) return null
        if (state.error) return <Text>{toClientErrorMessage(state.error)}</Text>
        if (!state.searchByTitleQuery.data?.results.length)
            return (
                <Text>
                    No Movies found with search query of "{state.searchQuery}"
                </Text>
            )

        return (
            <Grid>
                {state.searchByTitleQuery.data.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </Grid>
        )
    })()

    const pagination: React.ReactNode = (() => {
        if (state.pagination.totalPagesCount <= 1) return null
        return (
            <Pagination
                defaultValue={state.pagination.page}
                total={state.pagination.totalPagesCount}
                value={state.pagination.page}
                onChange={state.pagination.onPageChange}
            />
        )
    })()

    return (
        <React.Fragment>
            {content}
            <Center mt='auto' pb={20}>
                {pagination}
            </Center>
        </React.Fragment>
    )
}
