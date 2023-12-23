import {Button, Stack} from '@mantine/core'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {signOut} from 'next-auth/react'
import * as React from 'react'

import {useBookmarksInLocalStorage} from '@/components/movies/Bookmark/useBookmarksInLocalStorage'

function useNavigationState() {
    const router = useRouter()
    const [bookmarks] = useBookmarksInLocalStorage()

    const handleSignOut = () => {
        try {
            void signOut({redirect: false})
            router.push(`/auth/login`)
        } catch (error) {
            /* CATCH THE EXCEPTION */
        }
    }

    const isBookmarksButtonVisible = bookmarks.length !== 0
    return {handleSignOut, isBookmarksButtonVisible}
}

const Navigation: React.FC = () => {
    const state = useNavigationState()

    return (
        <Stack style={{flexDirection: 'row'}}>
            <Button onClick={state.handleSignOut}>Sign out</Button>
            <Button
                component={Link}
                display={state.isBookmarksButtonVisible ? 'block' : 'none'}
                href='/bookmarks'
            >
                Boookmarks
            </Button>
        </Stack>
    )
}
export default Navigation
