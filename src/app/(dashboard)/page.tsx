'use client'

import {Loader} from '@mantine/core'
import dynamic from 'next/dynamic'
import * as React from 'react'

const MovieSearch = dynamic(
    () =>
        import('@/components/movies/MovieSearch/MovieSearch').then(
            (m) => m.MovieSearch,
        ),
    {
        loading: () => <Loader size={36} />,
        ssr: false,
    },
)

const Page: React.FC = () => {
    return <MovieSearch />
}

export default Page
