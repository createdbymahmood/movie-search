import * as React from 'react'

import {MovieSearch} from '@/components/movies/MovieSearch'
import {constructMetadata} from '@/utils/constructMetadata'

export const metadata = constructMetadata({
    title: 'Movie Search',
})

const Page: React.FC = () => {
    return <MovieSearch />
}

export default Page
