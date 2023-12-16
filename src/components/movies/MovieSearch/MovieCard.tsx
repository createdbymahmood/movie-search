'use client'

import {Card, Grid, Loader, Text} from '@mantine/core'
import isUrl from 'is-url'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import * as React from 'react'

import type {Movie} from '@/lib/data-provider/OMDB/types'
import {DEFAULT_MOVIE_POSTER} from '~~/configs/constants'

export interface MovieCardProps {
    movie: Movie
}
const Bookmark = dynamic(
    () => import('@/components/movies/Bookmark/Bookmark'),
    {
        loading: () => <Loader size='sm' />,
    },
)

export const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
    const image: React.ReactNode = (() => {
        const posterUrl = isUrl(movie.Poster)
            ? movie.Poster
            : DEFAULT_MOVIE_POSTER

        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={movie.Title} src={posterUrl} />
        )
    })()

    return (
        <Grid.Col key={movie.imdbID} span={{lg: 3, md: 4, sm: 6, xs: 12}}>
            <Link href={`/details/${movie.imdbID}`}>
                <Card>
                    {image}
                    <Text>{movie.Year}</Text>
                    <Text>{movie.Title}</Text>
                </Card>
            </Link>
            <Bookmark id={movie.imdbID} />
        </Grid.Col>
    )
}
