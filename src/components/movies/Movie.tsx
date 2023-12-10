'use client'

import isUrl from 'is-url'
import {useParams} from 'next/navigation'
import * as React from 'react'

import {useGetId} from '@/lib/data-provider/OMDB/__generated'
import type {MovieDetails} from '@/lib/data-provider/OMDB/types'

function useMovieState() {
    const params = useParams<{id: string}>()
    const movieByIdQuery = useGetId<MovieDetails>({i: params.id})
    return {movieByIdQuery}
}

export const Movie: React.FC = () => {
    const state = useMovieState()

    const image = isUrl(
        state.movieByIdQuery.data?.Poster as unknown as string,
    ) ? (
        <img src={state.movieByIdQuery.data?.Poster} />
    ) : null

    return (
        <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {image}
            <pre>{JSON.stringify(state.movieByIdQuery.data, null, 2)}</pre>
        </div>
    )
}
