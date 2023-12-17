'use client'

import * as React from 'react'

import {withAuth} from '@/components/authentication/HOC/withAuth'

export interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <React.Fragment>{children}</React.Fragment>
}

export default withAuth(Layout)
