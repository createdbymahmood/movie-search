'use client'

import {divide, floor, toNumber, toString} from 'lodash'

import {useMovieQueryParamStates} from '@/components/movies/MovieSearch/useMovieQueryParamStates'
import {useTitleSearch} from '@/lib/data-provider/OMDB/__generated'
import type {TitleSearchResponse} from '@/lib/data-provider/OMDB/types'

export function useMovieSearchState() {
    const [queryParams, setQueryParams] = useMovieQueryParamStates()

    const searchByTitleQuery = useTitleSearch<TitleSearchResponse>({
        s: queryParams.search,
        page: toNumber(queryParams.page),
    })

    const perPage = 10

    const onPageChange = (value: number): void =>
        setQueryParams({page: toString(value)})

    const totalPagesCount: number = (() => {
        const totalMoviesCount =
            toNumber(searchByTitleQuery.data?.totalResults) || 0
        return floor(divide(totalMoviesCount, perPage))
    })()

    const pagination = {
        totalPagesCount,
        onPageChange,
        page: toNumber(queryParams.page),
        perPage,
    }

    const error = searchByTitleQuery.data?.Error ?? searchByTitleQuery.error
    return {
        searchByTitleQuery,
        pagination,
        error,
        searchQuery: queryParams.search,
    }
}
