import type {
    QueryClientConfig,
    QueryObserverOptions,
} from '@tanstack/query-core'
import {QueryClient} from '@tanstack/query-core'
import {cache} from 'react'

import {env} from '~~/configs/env'

const defaultQueryOptions: QueryObserverOptions = {
    suspense: true,
    retry: env.NODE_ENV === 'production',
}

export const queryClientConfig: QueryClientConfig = {
    defaultOptions: {queries: defaultQueryOptions},
}

export const getQueryClient = cache(() => new QueryClient(queryClientConfig))
