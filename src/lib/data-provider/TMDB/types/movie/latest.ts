export interface ProductionCompany {
    id: number
    logo_path?: any
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface LatestMovie {
    adult: boolean
    backdrop_path?: any
    belongs_to_collection?: any
    budget: number
    genres: any[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path?: any
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: any[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}
