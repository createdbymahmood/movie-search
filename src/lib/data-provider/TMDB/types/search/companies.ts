import type {PaginatedResponse} from '..'

export interface CompanySearchResult {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
}

export type CompaniesSearchResults = PaginatedResponse<CompanySearchResult>
