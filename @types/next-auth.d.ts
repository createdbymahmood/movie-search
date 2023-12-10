import type {DefaultSession} from 'next-auth'
import NextAuth from 'next-auth'

import type {User} from '@/lib/data-provider/JsonPlaceholder/__generated'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: DefaultSession['user'] & User
    }
}

declare module 'next-auth/react' {
    interface SignInOptions {
        email: string
        password: string
    }
}

export {}
