import {Button} from '@mantine/core'
import * as React from 'react'

import {withAuth} from '@/components/authentication/HOC/withAuth'
import {useBookmarksInLocalStorage} from '@/components/movies/Bookmark/useBookmarksInLocalStorage'

function useBookmarkState({id}: BookmarkProps) {
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

    return {
        bookmarks,
        setBookmarks,
        toggleBookmark,
        isBookmarked,
    }
}

export interface BookmarkProps {
    id: string
}

const Bookmark: React.FC<BookmarkProps> = ({id}) => {
    const state = useBookmarkState({id})
    return (
        <Button
            color={state.isBookmarked ? 'red' : 'blue'}
            onClick={state.toggleBookmark}
        >
            {state.isBookmarked ? 'Delete from bookmarks' : 'Bookmark'}
        </Button>
    )
}

export default withAuth(Bookmark)
