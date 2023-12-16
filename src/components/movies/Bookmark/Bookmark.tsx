import {Button} from '@mantine/core'
import {useSession} from 'next-auth/react'
import * as React from 'react'

import {useBookmarksInLocalStorage} from '@/components/movies/hooks/useBookmarksInLocalStorage'

function useBookmarkState({id}: BookmarkProps) {
    const session = useSession()
    const [bookmarks, setBookmarks] = useBookmarksInLocalStorage()
    const movieId = id

    const toggleBookmark = () => {
        const updater = (prevBookmarks: string[]) => {
            if (prevBookmarks.includes(movieId))
                return prevBookmarks.filter(
                    (bookmarkId) => bookmarkId !== movieId,
                )
            return [...prevBookmarks, movieId]
        }

        setBookmarks(updater)
    }

    const isBookmarked = bookmarks.includes(movieId)
    return {bookmarks, setBookmarks, toggleBookmark, isBookmarked, session}
}

export interface BookmarkProps {
    id: string
}

const Bookmark: React.FC<BookmarkProps> = ({id}) => {
    const state = useBookmarkState({id})

    if (!state.session.data) return <React.Fragment />
    return (
        <Button
            color={state.isBookmarked ? 'red' : 'blue'}
            onClick={state.toggleBookmark}
        >
            {state.isBookmarked ? 'Delete from bookmarks' : 'Bookmark'}
        </Button>
    )
}

export default Bookmark
