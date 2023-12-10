'use client'

import {Loader, MantineProvider} from '@mantine/core'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryStreamedHydration} from '@tanstack/react-query-next-experimental'
import {SessionProvider} from 'next-auth/react'
import * as React from 'react'

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
                    <React.Suspense fallback={<Loader />}>
                        <SessionProvider>{children}</SessionProvider>
                    </React.Suspense>
                </MantineProvider>
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    )
}
