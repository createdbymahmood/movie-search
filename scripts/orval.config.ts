import type {Options} from 'orval'
import {defineConfig} from 'orval'

const defaultOutputOptions: Options['output'] = {
    mode: 'single',
    prettier: true,
    client: 'react-query',
}

export default defineConfig({
    OMDB: {
        output: {
            ...defaultOutputOptions,
            mode: 'single',
            target: '../src/lib/data-provider/OMDB/__generated.ts',
            override: {
                mutator: {
                    path: '../src/lib/axios.ts',
                    name: 'OMDBAxiosInstance',
                },
            },
        },
        input: {
            target: '../swagger/omdb.json',
        },
    },
    JsonPlaceholder: {
        output: {
            ...defaultOutputOptions,
            target: '../src/lib/data-provider/JsonPlaceholder/__generated.ts',
            override: {
                mutator: {
                    path: '../src/lib/axios.ts',
                    name: 'JsonPlaceholderInstance',
                },
            },
        },
        input: {
            target: '../swagger/jsonplaceholder.json',
        },
    },
    TMDB: {
        output: {
            ...defaultOutputOptions,
            target: '../src/lib/data-provider/TMDB/__generated.ts',
            override: {
                mutator: {
                    path: '../src/lib/axios.ts',
                    name: 'TMDBInstance',
                },
            },
        },
        input: {
            target: '../swagger/TMDB.yaml',
        },
    },
})
