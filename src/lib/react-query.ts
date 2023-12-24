import type {
    QueryClientConfig,
    QueryObserverOptions,
} from '@tanstack/query-core'
import {QueryClient} from '@tanstack/query-core'
import {cache} from 'react'

const defaultQueryOptions: QueryObserverOptions = {}

export const queryClientConfig: QueryClientConfig = {
    defaultOptions: {queries: defaultQueryOptions},
}

export const getQueryClient = cache(() => new QueryClient(queryClientConfig))
