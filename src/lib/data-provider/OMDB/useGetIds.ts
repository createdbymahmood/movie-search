import type {QueryFunction, QueryKey} from '@tanstack/query-core'
import type {UseQueryOptions, UseQueryResult} from '@tanstack/react-query'
import {useQuery} from '@tanstack/react-query'

import type {ErrorType} from '@/lib/axios'
import type {GetIdParams} from '@/lib/data-provider/OMDB/__generated'
import {getGetIdQueryKey, getId} from '@/lib/data-provider/OMDB/__generated'
import type {MovieDetails} from '@/lib/data-provider/OMDB/types'

type PromiseResponse = Promise<MovieDetails>
type PromiseResponses = Promise<MovieDetails[]>

const getIdsOptions = <
    TData = Awaited<PromiseResponses>,
    TError = ErrorType<unknown>,
>(
    params: {Ids: string[]},
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<PromiseResponses>, TError, TData>
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey =
        queryOptions?.queryKey ??
        getGetIdQueryKey(params as unknown as GetIdParams)

    const queryFn: QueryFunction<Awaited<PromiseResponses>> = async ({
        signal,
    }) => {
        const promises: PromiseResponse[] = []
        params.Ids.forEach((id) => {
            promises.push(getId({i: id}, signal) as unknown as PromiseResponse)
        })

        return Promise.all(promises)
    }

    return {queryKey, queryFn, ...queryOptions} as UseQueryOptions<
        Awaited<PromiseResponses>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export const useGetIds = <
    TData = Awaited<PromiseResponses>,
    TError = ErrorType<unknown>,
>(
    params: {Ids: string[]},
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<PromiseResponses>, TError, TData>
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getIdsOptions(params, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}
