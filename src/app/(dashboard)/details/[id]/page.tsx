import {toNumber} from 'lodash'
import type {Metadata} from 'next'

import {Movie} from '@/components/movies/Movie/Movie'
import {getMovieMovieId} from '@/lib/data-provider/TMDB/__generated'
import type {MovieSearchResult} from '@/lib/data-provider/TMDB/types/search/movies'
import {constructMetadata} from '@/utils/constructMetadata'

interface Props {
    params: {id: string}
    searchParams: {[key: string]: string[] | string | undefined}
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const id = toNumber(params.id)

    try {
        const movie = (await getMovieMovieId(
            id,
        )) as unknown as MovieSearchResult

        return constructMetadata({
            title: movie.title,
            description: movie.overview,
        })
    } catch (error) {
        return constructMetadata({
            title: 'Movie',
            description: 'A place to find your favorite movie',
        })
    }
}

export default Movie
