import type {PaginatedResponse} from '..'

export interface KeywordSearchResult {
    name: string
    id: number
}

export type KeywordsSearchResults = PaginatedResponse<KeywordSearchResult>
