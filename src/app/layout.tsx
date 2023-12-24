import '@mantine/core/styles.css'

import {ColorSchemeScript} from '@mantine/core'
import {Inter} from 'next/font/google'
import * as React from 'react'

import {Providers} from '@/components/general/Providers'
import {constructMetadata} from '@/utils/constructMetadata'

const inter = Inter({
    weight: '400',
    subsets: ['latin'],
})

export const metadata = constructMetadata({
    title: 'Movie Search',
    description: 'A place to find your favorite movie',
})

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <link href='/next.svg' rel='shortcut icon' />
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
