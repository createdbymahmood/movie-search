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
import {useCallbackRef} from '@mantine/hooks'
import isUrl from 'is-url'
import {debounce, isEmpty, lt} from 'lodash'
import * as React from 'react'

import {MovieSearchSkeleton} from '@/components/movies/MovieSearchSkeleton'
import {useSearchQueryParamState} from '@/components/movies/useSearchQueryParamState'
import {toClientErrorMessage} from '@/utils/error'
import {DEFAULT_MOVIE_POSTER} from '~~/configs/constants'

import {useMovieSearchState} from './useMovieSearchState'

export interface MovieSearchProps {
    // eslint-disable-next-line react/no-unused-prop-types
    searchQuery: string
    // eslint-disable-next-line react/no-unused-prop-types
    setSearchQuery: (sq: string) => void
}

export const MovieSearchContent: React.FC<MovieSearchProps> = (props) => {
    const state = useMovieSearchState(props)

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
        <React.Fragment>
            {content}
            <Center mt='auto'>{pagination}</Center>
        </React.Fragment>
    )
}

export const MovieSearch = () => {
    const [searchQuery, setSearchQuery] = useSearchQueryParamState<string>({
        key: 'search',
    })

    const onSearchQueryChange = useCallbackRef(
        debounce((event: React.ChangeEvent<HTMLInputElement>): void => {
            const value = event.target.value
            setSearchQuery(value)
        }, 2000),
    )

    return (
        <Container>
            <Stack
                display='flex'
                h='100vh'
                py={50}
                style={{flexDirection: 'column'}}
            >
                <TextInput
                    defaultValue={searchQuery}
                    placeholder='The Wolf of Wall Street...'
                    onChange={onSearchQueryChange}
                />

                <React.Suspense fallback={<MovieSearchSkeleton />}>
                    <MovieSearchContent
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </React.Suspense>
            </Stack>
        </Container>
    )
}
