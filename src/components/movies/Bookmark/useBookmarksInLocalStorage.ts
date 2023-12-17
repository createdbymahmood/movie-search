import {useLocalStorage} from '@mantine/hooks'

import {useSessionEmail} from '@/hooks/useSessionEmail'

export const useBookmarksInLocalStorage = () => {
    const email = useSessionEmail()
    const key = `bookmarks-key-${email}`
    return useLocalStorage({
        key,
        defaultValue: [] as string[],
    })
}
