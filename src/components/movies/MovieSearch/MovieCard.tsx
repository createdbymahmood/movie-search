'use client'

import {
    AspectRatio,
    Box,
    Grid,
    Skeleton,
    Stack,
    Text,
    Tooltip,
} from '@mantine/core'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import * as React from 'react'

import {useOverflow} from '@/hooks/useOverflow'
import type {MovieSearchResult} from '@/lib/data-provider/TMDB/types/search/movies'
import {transformISO8601ToYYYYFormat} from '@/utils/date'
import {createMoviePosterUrl} from '@/utils/movie'

export interface MovieCardProps {
    movie: MovieSearchResult
}
const Bookmark = dynamic(
    () => import('@/components/movies/Bookmark/Bookmark'),
    {
        loading: () => <Skeleton h={36} />,
        ssr: false,
    },
)

const useMovieCardState = ({movie}: MovieCardProps) => {
    const titleTextRef = React.useRef<HTMLParagraphElement>(null!)
    const titleTextOverflowState = useOverflow(titleTextRef)
    const isTooltipVisible = titleTextOverflowState.refXOverflowing
    const tooltipContent = isTooltipVisible ? movie.title : null

    return {
        tooltipContent,
        titleText: {
            ref: titleTextRef,
            overflowState: titleTextOverflowState,
        },
        isTooltipVisible,
    }
}

export const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
    const state = useMovieCardState({movie})
    const image: React.ReactNode = (() => {
        const posterUrl = createMoviePosterUrl(movie.poster_path)

        return (
            <AspectRatio maw={300} mx='auto' ratio={720 / 1080}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={movie.title} src={posterUrl} />
            </AspectRatio>
        )
    })()

    return (
        <Grid.Col key={movie.id} h='100%' span={{lg: 3, md: 4, sm: 6, xs: 12}}>
            <Stack>
                <Box
                    c='black'
                    component={Link}
                    h='100%'
                    href={`/details/${movie.id}`}
                    mt='auto'
                    td='none'
                    w='100%'
                >
                    {image}
                    <Text mt={5}>
                        {transformISO8601ToYYYYFormat(movie.release_date)}
                    </Text>
                    <Tooltip
                        label={state.tooltipContent}
                        style={{
                            display: state.isTooltipVisible ? 'block' : 'none',
                        }}
                        transitionProps={{transition: 'pop'}}
                    >
                        <Text ref={state.titleText.ref} mt={5} truncate>
                            {movie.title}
                        </Text>
                    </Tooltip>
                </Box>
                <Bookmark id={movie.id} />
            </Stack>
        </Grid.Col>
    )
}
