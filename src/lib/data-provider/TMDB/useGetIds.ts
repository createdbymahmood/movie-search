import type {QueryFunction} from '@tanstack/query-core'
import type {UseQueryOptions} from '@tanstack/react-query'
import {useQueries} from '@tanstack/react-query'

import type {ErrorType} from '@/lib/axios'
import type {
    GetMovieMovieId401,
    GetMovieMovieId404,
} from '@/lib/data-provider/TMDB/__generated'
import {getMovieMovieId} from '@/lib/data-provider/TMDB/__generated'
import type {MovieSearchResult} from '@/lib/data-provider/TMDB/types/search/movies'

export const getGetMovieMovieIdQueryKey = (movieId: number) => {
    return [`/movie/${movieId}`] as const
}

type Response = MovieSearchResult

export const getGetMovieMovieIdQueryOptions = <
    TData = Promise<Response>,
    TError = ErrorType<GetMovieMovieId401 | GetMovieMovieId404>,
>(
    movieIds: number[],
    options?: {
        query?: Partial<UseQueryOptions<Promise<Response>, TError, TData>>
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queriesOptions = movieIds.map((movieId) => {
        const queryKey =
            queryOptions?.queryKey ?? getGetMovieMovieIdQueryKey(movieId)
        const queryFn: QueryFunction<Promise<Response>> = ({signal}) =>
            /* @ts-ignore because of some uknown TS errors */
            getMovieMovieId(movieId, signal)

        return {
            queryKey,
            queryFn,
            enabled: !!movieId,
            ...queryOptions,
        }
    })
    return queriesOptions
}

export type GetMovieMovieIdQueryResult = NonNullable<Promise<Response>>
export type GetMovieMovieIdQueryError = ErrorType<
    GetMovieMovieId401 | GetMovieMovieId404
>

/**
 * @summary Get Multiple Details
 */
export const useGetMovieMovieIds = <
    TData = Response,
    TError = ErrorType<GetMovieMovieId401 | GetMovieMovieId404>,
>(
    movieIds: number[],
    options?: {
        query?: Partial<UseQueryOptions<Promise<Response>, TError, TData>>
    },
) => {
    const queries = getGetMovieMovieIdQueryOptions(movieIds, options)
    return useQueries({queries})
}

export type MovieQueryOptions = Partial<
    UseQueryOptions<
        Promise<MovieSearchResult>,
        ErrorType<GetMovieMovieId401 | GetMovieMovieId404>,
        MovieSearchResult
    >
>
