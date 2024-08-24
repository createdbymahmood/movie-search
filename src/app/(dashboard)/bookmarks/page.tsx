import dynamic from 'next/dynamic'
import * as React from 'react'

import {MoviesGridLoadingFallback} from '@/components/movies/bookmark/bookmarks'

const Bookmarks = dynamic(
  () => import('@/components/movies/bookmark/bookmarks'),
  {
    loading: MoviesGridLoadingFallback,
    ssr: false,
  },
)

const Page: React.FC = () => {
  return <Bookmarks />
}

export default Page
