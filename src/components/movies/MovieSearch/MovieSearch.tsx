'use client'

import {Box, Button, Container, Loader, Stack, TextInput} from '@mantine/core'
import dynamic from 'next/dynamic'
import * as React from 'react'
import type {UseFormProps} from 'react-hook-form'
import {useForm} from 'react-hook-form'

import {AppErrorBoundary} from '@/components/general/AppErrorBoundary'
import {MovieSearchContent} from '@/components/movies/MovieSearch/MovieSearchContent'
import {MovieSearchFilters} from '@/components/movies/MovieSearch/MovieSearchFilters'
import {MovieSearchSkeleton} from '@/components/movies/MovieSearch/MovieSearchSkeleton'
import {
    DEFAULT_MOVIES_PAGE_NUMBER,
    useMovieQueryParamStates,
} from '@/components/movies/MovieSearch/useMovieQueryParamStates'

const Navigation = dynamic(() => import('@/components/general/Navigation'), {
    loading: () => <Loader size={36} />,
    ssr: false,
})

interface MovieSearchFormValues {
    search: string
}

function useMovieSearchInputState() {
    const [queryParams, setQueryParams] = useMovieQueryParamStates()
    const defaultMovieSearchFormProps: UseFormProps<
        MovieSearchFormValues,
        unknown
    > = {
        defaultValues: {search: queryParams.search},
    }

    const form = useForm<MovieSearchFormValues>(defaultMovieSearchFormProps)

    const onSubmit = form.handleSubmit(({search}) => {
        setQueryParams({search, page: DEFAULT_MOVIES_PAGE_NUMBER})
    })

    return {queryParams, form: {...form, onSubmit}}
}

const MovieSearchInput = () => {
    const state = useMovieSearchInputState()

    return (
        <Box component='form' w='100%' onSubmit={state.form.onSubmit}>
            <Stack style={{flexDirection: 'row'}}>
                <TextInput
                    {...state.form.register('search')}
                    defaultValue={state.queryParams.search}
                    placeholder='Search movie name and wait...'
                    style={{flex: 1}}
                />
                <MovieSearchFilters />
                <Button type='submit'>Search</Button>
            </Stack>
        </Box>
    )
}

export const MovieSearch = () => {
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
                    <MovieSearchInput />
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
