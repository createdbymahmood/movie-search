'use client'

import {Container, Stack, TextInput} from '@mantine/core'
import {useCallbackRef} from '@mantine/hooks'
import {debounce} from 'lodash'
import * as React from 'react'

import {MovieSearchContent} from '@/components/movies/MovieSearch/MovieSearchContent'
import {
    DEFAULT_MOVIES_PAGE_NUMBER,
    useMovieQueryParamStates,
} from '@/components/movies/MovieSearch/useMovieQueryParamStates'
import {MovieSearchSkeleton} from '@/components/movies/MovieSearchSkeleton'

export const MovieSearch = () => {
    const [queryParams, setQueryParams] = useMovieQueryParamStates()

    const onSearchInputChange = useCallbackRef(
        debounce((event: React.ChangeEvent<HTMLInputElement>): void => {
            const value = event.target.value
            setQueryParams({search: value, page: DEFAULT_MOVIES_PAGE_NUMBER})
        }, 1000),
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
                    defaultValue={queryParams.search}
                    placeholder='The Wolf of Wall Street...'
                    onChange={onSearchInputChange}
                />

                <React.Suspense fallback={<MovieSearchSkeleton />}>
                    <MovieSearchContent />
                </React.Suspense>
            </Stack>
        </Container>
    )
}
