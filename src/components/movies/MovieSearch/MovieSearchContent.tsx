'use client'

import {Center, Grid, Pagination, Text} from '@mantine/core'
import {isEmpty, lt} from 'lodash'
import * as React from 'react'

import {MovieCard} from '@/components/movies/MovieSearch/MovieCard'
import {toClientErrorMessage} from '@/utils/error'

import {useMovieSearchState} from './useMovieSearchState'

export const MovieSearchContent: React.FC = () => {
    const state = useMovieSearchState()

    const content = (() => {
        if (isEmpty(state.searchQuery)) return null
        if (state.error) return <Text>{toClientErrorMessage(state.error)}</Text>

        return (
            <Grid>
                {state.searchByTitleQuery.data?.Search.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </Grid>
        )
    })()

    const pagination: React.ReactNode = (() => {
        if (lt(state.pagination.perPage, state.pagination.totalPagesCount))
            return null
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
