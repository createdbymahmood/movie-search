'use client'

import {Container} from '@mantine/core'
import dynamic from 'next/dynamic'
import * as React from 'react'

import {MovieSearchSkeleton} from '@/components/movies/MovieSearch/MovieSearchSkeleton'

const fallback = (
    <Container py={20}>
        <MovieSearchSkeleton />
    </Container>
)

const Bookmarks = dynamic(
    () => import('@/components/movies/Bookmark/Bookmarks'),
    {
        loading: () => fallback,
    },
)

const Page: React.FC = () => {
    return (
        <React.Suspense>
            <Bookmarks />
        </React.Suspense>
    )
}

export default Page
