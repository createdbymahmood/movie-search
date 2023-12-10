import {Button} from '@mantine/core'
import {useLocalStorage} from '@mantine/hooks'
import {get} from 'lodash'
import {useSession} from 'next-auth/react'
import * as React from 'react'

function useBookmarkState({id}: BookmarkProps) {
    const session = useSession()

    const [bookmarks, setBookmarks] = useLocalStorage({
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        key: `bookmarks-key-${get(session, 'data.session.user.email')}`,
        // key: 'random-key',
        defaultValue: [] as string[],
    })

    const movieId = id

    const toggleBookmark = () => {
        setBookmarks((prevBookmarks) => {
            if (prevBookmarks.includes(movieId))
                return prevBookmarks.filter(
                    (bookmarkId) => bookmarkId !== movieId,
                )
            return [...prevBookmarks, movieId]
        })
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
