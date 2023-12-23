import {isNil} from 'lodash'

import {DEFAULT_MOVIE_POSTER} from '~~/configs/constants'
import {env} from '~~/configs/env'

export const createMoviePosterUrl = (posterPath?: string) => {
    if (isNil(posterPath)) {
        return DEFAULT_MOVIE_POSTER
    }

    return `${env.TMDB_IMAGES_BASEPATH}${posterPath}`
}
