'use client'

import {Center, Grid, Pagination, Text} from '@mantine/core'
import {isEmpty, isNil} from 'lodash'
import * as React from 'react'

import {MovieCard} from '@/components/movies/MovieSearch/MovieCard'

import {useMovieSearchState} from './useMovieSearchState'

export const MovieSearch: React.FC = () => {
    const state = useMovieSearchState()
    const {
        searchByTitleQuery: {data},
        searchQuery,
    } = state

    const content = (() => {
        if (isEmpty(searchQuery)) return null
        if (!data?.results.length)
            return (
                <Text>
                    No Movies found with search query of "{state.searchQuery}"
                </Text>
            )

        return (
            <Grid>
                {data.results.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </Grid>
        )
    })()

    const {totalPagesCount} = state.pagination
    const hasPagination = !isNil(totalPagesCount) && totalPagesCount > 1

    const pagination: React.ReactNode = (() => {
        if (!hasPagination) return null
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
