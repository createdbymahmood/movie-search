export interface Cast {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface CrewMember {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    credit_id: string
    department: string
    job: string
}

export interface MovieCredits {
    id: number
    cast: Cast[]
    crew: CrewMember[]
}
