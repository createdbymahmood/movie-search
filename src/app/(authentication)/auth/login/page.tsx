import * as React from 'react'

import {LoginForm} from '@/components/authentication/LoginForm'
import {constructMetadata} from '@/utils/constructMetadata'

export const metadata = constructMetadata({
    title: 'Login Page',
    description: 'This is the place where everything start...',
})

const Page: React.FC = () => {
    return <LoginForm />
}

export default Page
