declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NEXT_PUBLIC_JsonPlaceholder_API_URL: string
            readonly NEXTAUTH_SECRET: string
            readonly NEXT_PUBLIC_TMDB_API_URL: string
            readonly NEXT_PUBLIC_TMDB_API_KEY: string
            readonly NEXT_PUBLIC_TMDB_IMAGES_BASEPATH: string
        }
    }
}

export {}
