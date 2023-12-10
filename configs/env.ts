import * as Y from 'yup'

import {isSSR} from '@/utils/isSSR'

const envSchema = Y.object({
    JsonPlaceholderAPIURL: Y.string().url().required(),
    OMDBAPIURL: Y.string().required(),
    OMDBAPIKey: Y.string().required(),
    /* as it does not start with NEXT_PUBLIC it will throw error on browser when validating */
    NEXTAUTH_SECRET: isSSR ? Y.string().required() : Y.string().optional(),
})

export const env = envSchema.validateSync({
    JsonPlaceholderAPIURL: process.env.NEXT_PUBLIC_JsonPlaceholder_API_URL,
    OMDBAPIURL: process.env.NEXT_PUBLIC_OMDB_API_URL,
    OMDBAPIKey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
})
