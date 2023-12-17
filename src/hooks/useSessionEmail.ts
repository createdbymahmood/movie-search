import {get} from 'lodash'
import {useSession} from 'next-auth/react'

export function useSessionEmail() {
    const session = useSession()
    const email = get(session, 'data.session.user.email') as string | undefined
    return email
}
