'use client'

import {Container} from '@mantine/core'
import dynamic from 'next/dynamic'
import * as React from 'react'

import {MovieSearchSkeleton} from '@/components/movies/MovieSearch/MovieSearchSkeleton'

const Bookmarks = dynamic(() => import('@/components/movies/Bookmarks'), {
    loading: () => (
        <Container py={20}>
            <MovieSearchSkeleton />
        </Container>
    ),
})

const Page: React.FC = () => {
    return <Bookmarks />
}

export default Page
