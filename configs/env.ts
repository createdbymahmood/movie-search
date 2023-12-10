import * as Y from 'yup'

const envSchema = Y.object({
    JsonPlaceholderAPIURL: Y.string().url().required(),
    OMDBAPIURL: Y.string().required(),
})

export const env = envSchema.validateSync({
    JsonPlaceholderAPIURL: process.env.NEXT_PUBLIC_JsonPlaceholder_API_URL,
    OMDBAPIURL: process.env.NEXT_PUBLIC_OMDB_API_URL,
})
