'use client'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryStreamedHydration} from '@tanstack/react-query-next-experimental'
import * as React from 'react'

import {queryClientConfig} from '@/lib/react-query'

function useProvidersState() {
    const client = React.useMemo(() => new QueryClient(queryClientConfig), [])
    return {client}
}

export interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({children}) => {
    const state = useProvidersState()

    return (
        <QueryClientProvider client={state.client}>
            <ReactQueryStreamedHydration>
                {children}
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    )
}
