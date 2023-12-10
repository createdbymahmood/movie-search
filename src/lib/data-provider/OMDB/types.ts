export interface Movie {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

export interface TitleSearchResponse {
    Search: Movie[]
    totalResults: string
    Response: 'False' | 'True'
    Error?: string
}
