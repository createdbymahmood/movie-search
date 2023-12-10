import * as React from 'react'

import {MovieSearch} from '@/components/movies/MovieSearch'
import {MovieSearchSkeleton} from '@/components/movies/MovieSearchSkeleton'
import {constructMetadata} from '@/utils/constructMetadata'

export const metadata = constructMetadata({
    title: 'Dashboard',
})

const Page: React.FC = () => {
    return (
        <React.Suspense fallback={<MovieSearchSkeleton />}>
            <MovieSearch />
        </React.Suspense>
    )
}

export default Page
