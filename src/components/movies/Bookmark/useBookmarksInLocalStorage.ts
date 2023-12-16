import {useLocalStorage} from '@mantine/hooks'
import {get} from 'lodash'
import {useSession} from 'next-auth/react'

export const useBookmarksInLocalStorage = () => {
    const session = useSession()

    const key = `bookmarks-key-${get(session, 'data.session.user.email')}`
    return useLocalStorage({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        key,
        defaultValue: [] as string[],
    })
}
