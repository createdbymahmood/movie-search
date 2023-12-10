'use client'

import {divide, floor, toNumber, toString} from 'lodash'

import type {MovieSearchProps} from '@/components/movies/MovieSearch'
import {useSearchQueryParamState} from '@/components/movies/useSearchQueryParamState'
import {useTitleSearch} from '@/lib/data-provider/OMDB/__generated'
import type {TitleSearchResponse} from '@/lib/data-provider/OMDB/types'

interface UseMovieSearchStateParams extends MovieSearchProps {}

export function useMovieSearchState({searchQuery}: UseMovieSearchStateParams) {
    const [page, setPage] = useSearchQueryParamState<string>({
        key: 'page',
        defaultValue: '1',
    })

    const searchByTitleQuery = useTitleSearch<TitleSearchResponse>({
        s: searchQuery,
        page: toNumber(page),
    })

    const perPage = 10

    const onPageChange = (value: number): void => setPage(toString(value))

    const totalPaginationPagesCount: number = (() => {
        if (!toNumber(searchByTitleQuery.data?.totalResults)) return 0

        return floor(
            divide(toNumber(searchByTitleQuery.data?.totalResults), perPage),
        )
    })()

    const pagination = {
        total: totalPaginationPagesCount,
        onPageChange,
        page: toNumber(page),
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
