'use client'

import {isEmpty, toNumber, toString} from 'lodash'

import {useMovieQueryParamStates} from '@/components/movies/MovieSearch/useMovieQueryParamStates'
import type {GetSearchMovieParams} from '@/lib/data-provider/TMDB/__generated'
import {useGetSearchMovie} from '@/lib/data-provider/TMDB/__generated'
import type {MoviesSearchResults} from '@/lib/data-provider/TMDB/types/search/movies'

export function useMovieSearchState() {
    const [queryParams, setQueryParams] = useMovieQueryParamStates()

    const page = toNumber(queryParams.page)
    const searchByTitleQuery = useGetSearchMovie<MoviesSearchResults>({
        query: queryParams.search,
        page,
    } as unknown as GetSearchMovieParams)

    const onPageChange = (value: number): void =>
        setQueryParams({page: toString(value)})

    const totalPagesCount = searchByTitleQuery.data
        ?.total_pages as unknown as number

    const pagination = {
        totalPagesCount,
        onPageChange,
        page: toNumber(queryParams.page),
    }

    const error = searchByTitleQuery.error

    return {
        searchByTitleQuery,
        pagination,
        error,
        searchQuery: queryParams.search,
    }
}
