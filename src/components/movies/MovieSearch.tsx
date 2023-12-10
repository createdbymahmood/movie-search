'use client'

import {
    Card,
    Center,
    Container,
    Grid,
    Pagination,
    Stack,
    Text,
    TextInput,
} from '@mantine/core'
import isUrl from 'is-url'
import {isEmpty, lt} from 'lodash'
import * as React from 'react'

import {toClientErrorMessage} from '@/utils/error'
import {DEFAULT_MOVIE_POSTER} from '~~/configs/constants'

import {useMovieSearchState} from './useMovieSearchState'

export const MovieSearch: React.FC = () => {
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
                            <img
                                alt={movie.Title}
                                height={200}
                                src={posterUrl}
                            />
                        )
                    })()

                    return (
                        <Grid.Col
                            key={movie.imdbID}
                            span={{lg: 3, md: 4, sm: 6, xs: 12}}
                        >
                            <Card>
                                {image}
                                <Text>{movie.Title}</Text>
                            </Card>
                        </Grid.Col>
                    )
                })}
            </Grid>
        )
    })()

    const pagination: React.ReactNode = (() => {
        if (lt(state.pagination.perPage, state.pagination.total)) return null
        return (
            <Pagination
                defaultValue={state.pagination.page}
                total={state.pagination.total}
                value={state.pagination.page}
                onChange={state.pagination.onPageChange}
            />
        )
    })()

    return (
        <Container>
            <Stack
                display='flex'
                h='100vh'
                py={50}
                style={{flexDirection: 'column'}}
            >
                <TextInput
                    defaultValue={state.searchQuery}
                    placeholder='The Wolf of Wall Street...'
                    onChange={state.onSearchQueryChange}
                />

                {content}
                <Center mt='auto'>{pagination}</Center>
            </Stack>
        </Container>
    )
}
