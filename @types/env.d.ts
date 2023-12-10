declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NEXT_PUBLIC_JsonPlaceholder_API_URL: string
            readonly NEXT_PUBLIC_OMDB_API_URL: string
            readonly NEXT_PUBLIC_OMDB_API_KEY: string
            readonly NEXTAUTH_SECRET: string
        }
    }
}

export {}
