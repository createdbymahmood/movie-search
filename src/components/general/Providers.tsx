'use client'

import {MantineProvider} from '@mantine/core'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryStreamedHydration} from '@tanstack/react-query-next-experimental'
import {SessionProvider} from 'next-auth/react'
import NextAdapterApp from 'next-query-params/app'
import * as React from 'react'
import {QueryParamProvider} from 'use-query-params'

import {theme} from '@/lib/mantine/theme'
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
                <MantineProvider theme={theme}>
                    <SessionProvider>
                        <QueryParamProvider adapter={NextAdapterApp}>
                            {children}
                        </QueryParamProvider>
                    </SessionProvider>
                </MantineProvider>
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    )
}
