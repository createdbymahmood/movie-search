'use client'

import {Container, Loader, Stack, TextInput} from '@mantine/core'
import {useCallbackRef} from '@mantine/hooks'
import {debounce} from 'lodash'
import dynamic from 'next/dynamic'
import * as React from 'react'

import {AppErrorBoundary} from '@/components/general/AppErrorBoundary'
import {MovieSearchContent} from '@/components/movies/MovieSearch/MovieSearchContent'
import {MovieSearchSkeleton} from '@/components/movies/MovieSearch/MovieSearchSkeleton'
import {
    DEFAULT_MOVIES_PAGE_NUMBER,
    useMovieQueryParamStates,
} from '@/components/movies/MovieSearch/useMovieQueryParamStates'

const Navigation = dynamic(() => import('@/components/general/Navigation'), {
    loading: () => <Loader size={20} />,
    ssr: false,
})

function useMovieSearchState() {
    const [queryParams, setQueryParams] = useMovieQueryParamStates()

    const onSearchInputChange = useCallbackRef(
        debounce((event: React.ChangeEvent<HTMLInputElement>): void => {
            const value = event.target.value
            setQueryParams({search: value, page: DEFAULT_MOVIES_PAGE_NUMBER})
        }, 1000),
    )

    return {queryParams, onSearchInputChange}
}

export const MovieSearch = () => {
    const state = useMovieSearchState()
    return (
        <Container pb={50}>
            <Stack
                display='flex'
                h='100vh'
                py={50}
                style={{flexDirection: 'column'}}
            >
                <Navigation />

                <Stack style={{flexDirection: 'row'}}>
                    <TextInput
                        defaultValue={state.queryParams.search}
                        placeholder='Search movie name and wait...'
                        style={{flex: 1}}
                        onChange={state.onSearchInputChange}
                    />
                </Stack>

                <React.Suspense fallback={<MovieSearchSkeleton />}>
                    <AppErrorBoundary>
                        <MovieSearchContent />
                    </AppErrorBoundary>
                </React.Suspense>
            </Stack>
        </Container>
    )
}
