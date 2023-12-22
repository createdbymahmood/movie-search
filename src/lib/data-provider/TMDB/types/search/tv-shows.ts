import type {PaginatedResponse} from '..'

export interface TvShowSearchResult {
    backdrop_path: string | null
    first_air_date: string
    genre_ids: number[]
    id: number
    name: string
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string | null
    vote_average: number
    vote_count: number
}

export type TvShowsSearchResults = PaginatedResponse<TvShowSearchResult>
