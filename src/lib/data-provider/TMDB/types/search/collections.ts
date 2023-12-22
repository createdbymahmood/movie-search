import type {PaginatedResponse} from '..'

export interface CollectionSearchResult {
    adult: boolean
    backdrop_path: string
    id: number
    name: string
    original_language: string
    original_name: string
    overview: string
    poster_path: string
}

export type CollectionsSearchResults = PaginatedResponse<CollectionSearchResult>
