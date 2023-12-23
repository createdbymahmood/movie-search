import {filter, isString, negate} from 'lodash'
import useLocalStorage from 'use-local-storage'

import {useSessionEmail} from '@/hooks/useSessionEmail'

export const useBookmarksInLocalStorage = () => {
    const email = useSessionEmail()
    const key = `bookmarks-key-${email}`

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [_bookmarks, _setBookmarks] = useLocalStorage(key, [] as number[])

    const bookmarks = filter(_bookmarks, negate(isString))
    return [bookmarks, _setBookmarks] as const
}
