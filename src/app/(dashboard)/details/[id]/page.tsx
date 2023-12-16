import type {Metadata} from 'next'
import * as React from 'react'

import {Movie} from '@/components/movies/Movie'
import {getId} from '@/lib/data-provider/OMDB/__generated'
import type {MovieDetails} from '@/lib/data-provider/OMDB/types'
import {constructMetadata} from '@/utils/constructMetadata'

interface Props {
    params: {id: string}
    searchParams: {[key: string]: string[] | string | undefined}
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const id = params.id

    const movie = (await getId({i: id})) as unknown as MovieDetails

    return constructMetadata({
        title: movie.Title,
        description: movie.Plot,
    })
}

const Page: React.FC = () => {
    return <Movie />
}

export default Page
