import '@mantine/core/styles.css'

import {ColorSchemeScript} from '@mantine/core'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import * as React from 'react'

import {Providers} from '@/components/Providers'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Movie Search',
    description: '',
}

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <link href='/favicon.svg' rel='shortcut icon' />
                <meta
                    content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
                    name='viewport'
                />
                <ColorSchemeScript />
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}

export default Layout
