import './globals.css'

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
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}

export default Layout
