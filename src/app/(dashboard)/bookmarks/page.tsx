import dynamic from 'next/dynamic'
import * as React from 'react'

import {MoviesGridLoadingFallback} from '@/components/movies/Bookmark/Bookmarks'

const Bookmarks = dynamic(
    () => import('@/components/movies/Bookmark/Bookmarks'),
    {
        loading: MoviesGridLoadingFallback,
        ssr: false,
    },
)

const Page: React.FC = () => {
    return <Bookmarks />
}

export default Page
