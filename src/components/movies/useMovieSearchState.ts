'use client'

import {divide, floor, toNumber, toString} from 'lodash'

import type {MovieSearchProps} from '@/components/movies/MovieSearch'
import {useMovieQueryParamStates} from '@/components/movies/useMovieQueryParamStates'
import {useTitleSearch} from '@/lib/data-provider/OMDB/__generated'
import type {TitleSearchResponse} from '@/lib/data-provider/OMDB/types'

interface UseMovieSearchStateParams extends MovieSearchProps {}

export function useMovieSearchState({searchQuery}: UseMovieSearchStateParams) {
    const [, page] = useMovieQueryParamStates()

    const searchByTitleQuery = useTitleSearch<TitleSearchResponse>({
        s: searchQuery,
        page: toNumber(page.value),
    })

    const perPage = 10

    const onPageChange = (value: number): void => page.set(toString(value))

    const totalPaginationPagesCount: number = (() => {
        const pagesCount = floor(
            divide(toNumber(searchByTitleQuery.data?.totalResults), perPage),
        )
        return isNaN(pagesCount) ? 0 : pagesCount
    })()

    const pagination = {
        total: totalPaginationPagesCount,
        onPageChange,
        page: toNumber(page.value),
        perPage,
    }

    const error = searchByTitleQuery.data?.Error ?? searchByTitleQuery.error
    return {
        searchByTitleQuery,
        pagination,
        error,
        searchQuery,
    }
}
