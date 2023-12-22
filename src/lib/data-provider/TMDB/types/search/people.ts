import type {PaginatedResponse} from '..'

export interface KnownForMovie {
    media_type: 'movie'
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface KnownForTvShow {
    media_type: 'tv'
    backdrop_path: string
    first_air_date: string
    genre_ids: number[]
    id: number
    name: string
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    poster_path: string
    vote_average: number
    vote_count: number
}

export interface PersonSearchResult {
    adult: boolean
    gender: number
    id: number
    known_for: (KnownForMovie | KnownForTvShow)[]
    known_for_department: string
    name: string
    popularity: number
    profile_path: string
}

export type PeopleSearchResults = PaginatedResponse<any>
