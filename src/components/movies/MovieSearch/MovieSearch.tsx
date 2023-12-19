'use client'

import {Button, Container, Stack, TextInput} from '@mantine/core'
import {useCallbackRef} from '@mantine/hooks'
import {debounce} from 'lodash'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {signOut} from 'next-auth/react'
import * as React from 'react'

import {AppErrorBoundary} from '@/components/general/AppErrorBoundary'
import {MovieSearchContent} from '@/components/movies/MovieSearch/MovieSearchContent'
import {MovieSearchSkeleton} from '@/components/movies/MovieSearch/MovieSearchSkeleton'
import {
    DEFAULT_MOVIES_PAGE_NUMBER,
    useMovieQueryParamStates,
} from '@/components/movies/MovieSearch/useMovieQueryParamStates'

function useMovieSearchState() {
    const [queryParams, setQueryParams] = useMovieQueryParamStates()

    const router = useRouter()
    const onSearchInputChange = useCallbackRef(
        debounce((event: React.ChangeEvent<HTMLInputElement>): void => {
            const value = event.target.value
            setQueryParams({search: value, page: DEFAULT_MOVIES_PAGE_NUMBER})
        }, 1000),
    )

    const handleSignOut = () => {
        try {
            void signOut({redirect: false})
            router.push(`/auth/login`)
        } catch (error) {
            /* CATCH THE EXCEPTION */
        }
    }

    return {queryParams, onSearchInputChange, handleSignOut}
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
                <Stack style={{flexDirection: 'row'}}>
                    <Button onClick={state.handleSignOut}>Sign out</Button>
                    <Button component={Link} href='/bookmarks'>
                        Boookmarks
                    </Button>
                </Stack>

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
