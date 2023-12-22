import type {MovieSearchResult} from './movies'
import type {PersonSearchResult} from './people'
import type {TvShowSearchResult} from './tv-shows'

export interface MultiMovieSearchResult extends MovieSearchResult {
    media_type: 'movie'
}

export interface MultiTvShowSearchResult extends TvShowSearchResult {
    media_type: 'tv'
}

export interface MultiPersonSearchResult extends PersonSearchResult {
    media_type: 'person'
}

export interface MultiSearchResults {
    page: number
    results: (
        | MultiMovieSearchResult
        | MultiPersonSearchResult
        | MultiTvShowSearchResult
    )[]
    total_pages: number
    total_results: number
}
