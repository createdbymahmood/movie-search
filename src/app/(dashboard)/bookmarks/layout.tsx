import * as React from 'react'

import {constructMetadata} from '@/utils/constructMetadata'

export const metadata = constructMetadata({
    title: 'Bookmarks',
    description: 'Your bookmakrs',
})

export interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <React.Fragment>{children}</React.Fragment>
)

export default Layout
