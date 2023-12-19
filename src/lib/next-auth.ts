import {find} from 'lodash'
import type {NextAuthOptions, Session, User} from 'next-auth'
import {getServerSession} from 'next-auth'
import type {
    CredentialInput,
    CredentialsConfig,
} from 'next-auth/providers/credentials'
import CredentialsProvider from 'next-auth/providers/credentials'

import {getUsers} from '@/lib/data-provider/JsonPlaceholder/__generated'
import {env} from '~~/configs/env'

type UserCredentialsConfig<C extends Record<string, CredentialInput>> = Partial<
    Omit<CredentialsConfig<C>, 'options'>
> &
    Pick<CredentialsConfig<C>, 'authorize' | 'credentials'>

const credentialsProviderConfig: UserCredentialsConfig<
    Record<string, CredentialInput>
> = {
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: 'Credentials',
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
        email: {
            label: 'Email',
            type: 'text',
        },
        password: {label: 'Password', type: 'password'},
    },

    async authorize(credentials) {
        try {
            // Add logic here to look up the user from the credentials supplied

            const users = await getUsers()

            const user = find(users, {
                email: credentials?.email,
                username: credentials?.password,
            })
            // const user = {id: '1', name: 'J Smith', email: 'jsmith@example.com'}

            if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return await (user as PromiseLike<User>)
            } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null

                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
        } catch (error) {
            return null
        }
    },
}

export const nextAuthOptions: NextAuthOptions = {
    secret: env.NEXTAUTH_SECRET,
    providers: [CredentialsProvider(credentialsProviderConfig)],
    pages: {
        signIn: '/auth/login',
        verifyRequest: '/auth/login',
        error: '/auth/login',
    },
    session: {strategy: 'jwt'},
}

export const getSession = (): Promise<Session | null> =>
    getServerSession(nextAuthOptions)
