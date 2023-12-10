'use client'

import {Card, Center, Grid, Pagination, Text} from '@mantine/core'
import isUrl from 'is-url'
import {isEmpty, lt} from 'lodash'
import Link from 'next/link'
import * as React from 'react'

import {toClientErrorMessage} from '@/utils/error'
import {DEFAULT_MOVIE_POSTER} from '~~/configs/constants'

import {useMovieSearchState} from './useMovieSearchState'

export const MovieSearchContent: React.FC = () => {
    const state = useMovieSearchState()

    const content = (() => {
        if (isEmpty(state.searchQuery)) return null
        if (state.error) return <Text>{toClientErrorMessage(state.error)}</Text>

        return (
            <Grid>
                {state.searchByTitleQuery.data?.Search.map((movie) => {
                    const image: React.ReactNode = (() => {
                        const posterUrl = isUrl(movie.Poster)
                            ? movie.Poster
                            : DEFAULT_MOVIE_POSTER

                        return (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img alt={movie.Title} src={posterUrl} />
                        )
                    })()

                    return (
                        <Grid.Col
                            key={movie.imdbID}
                            span={{lg: 3, md: 4, sm: 6, xs: 12}}
                        >
                            <Link href={`/details/${movie.imdbID}`}>
                                <Card>
                                    {image}
                                    <Text>{movie.Title}</Text>
                                </Card>
                            </Link>
                        </Grid.Col>
                    )
                })}
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
            <Center mt='auto'>{pagination}</Center>
        </React.Fragment>
    )
}
