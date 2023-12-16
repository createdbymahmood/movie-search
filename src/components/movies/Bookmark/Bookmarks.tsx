import {Container, Grid, Text} from '@mantine/core'
import {useSession} from 'next-auth/react'
import * as React from 'react'

import {useBookmarksInLocalStorage} from '@/components/movies/Bookmark/useBookmarksInLocalStorage'
import {MovieCard} from '@/components/movies/MovieSearch/MovieCard'
import {useGetIds} from '@/lib/data-provider/OMDB/useGetIds'
import {toClientErrorMessage} from '@/utils/error'

function useBookmarksState() {
    const [bookmarks] = useBookmarksInLocalStorage()
    const bookmarkedMovies = useGetIds({Ids: bookmarks})
    const session = useSession()

    return {session, bookmarks, bookmarkedMovies}
}

const Bookmarks: React.FC = () => {
    const state = useBookmarksState()
    if (!state.session.data) return <React.Fragment />
    const content = (() => {
        if (state.bookmarkedMovies.error)
            return (
                <Text>
                    {toClientErrorMessage(state.bookmarkedMovies.error)}
                </Text>
            )

        if (!state.bookmarkedMovies.data?.length)
            return <Text>No Bookmarks found</Text>

        return (
            <Grid>
                {state.bookmarkedMovies.data.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </Grid>
        )
    })()
    return <Container py={20}>{content}</Container>
}
export default Bookmarks
