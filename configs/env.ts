import * as Y from 'yup'

import {isSSR} from '@/utils/isSSR'

const envSchema = Y.object({
    /* as it does not start with NEXT_PUBLIC it will throw error on browser when validating */
    NEXTAUTH_SECRET: isSSR ? Y.string().required() : Y.string().optional(),

    JsonPlaceholderAPIURL: Y.string().url().required(),
    OMDBAPIURL: Y.string().required(),
    OMDBAPIKey: Y.string().required(),
    TMDBAPIURL: Y.string().required(),
    TMDBAPIKey: Y.string().required(),

    TMDB_IMAGES_BASEPATH: Y.string().required(),
})

export const env = envSchema.validateSync({
    JsonPlaceholderAPIURL: process.env.NEXT_PUBLIC_JsonPlaceholder_API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    OMDBAPIURL: process.env.NEXT_PUBLIC_OMDB_API_URL,
    OMDBAPIKey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
    TMDBAPIURL: process.env.NEXT_PUBLIC_TMDB_API_URL,
    TMDBAPIKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    TMDB_IMAGES_BASEPATH: process.env.NEXT_PUBLIC_TMDB_IMAGES_BASEPATH,
})
