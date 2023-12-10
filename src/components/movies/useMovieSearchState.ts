'use client'

import {useCallbackRef} from '@mantine/hooks'
import {debounce, divide, floor, isEmpty, toNumber, toString} from 'lodash'
import type * as React from 'react'

import {useSearchQueryParamState} from '@/components/movies/useSearchQueryParamState'
import {useTitleSearch} from '@/lib/data-provider/OMDB/__generated'
import type {TitleSearchResponse} from '@/lib/data-provider/OMDB/types'

export function useMovieSearchState() {
    const [page, setPage] = useSearchQueryParamState<string>({
        key: 'page',
        defaultValue: '1',
    })

    const [searchQuery, setSearchQuery] = useSearchQueryParamState<string>({
        key: 's',
    })

    const searchByTitleQuery = useTitleSearch<TitleSearchResponse>({
        s: searchQuery,
        page: toNumber(page),
    })

    const perPage = 10

    const onPageChange = (value: number) => setPage(toString(value))

    const onSearchQueryChange = useCallbackRef(
        debounce((event: React.ChangeEvent<HTMLInputElement>): void => {
            const value = event.target.value
            if (isEmpty(value)) return setSearchQuery('')
            setSearchQuery(value)
        }, 2000),
    )

    const totalPaginationPagesCount = floor(
        divide(toNumber(searchByTitleQuery.data?.totalResults), perPage),
    )

    const pagination = {
        total: totalPaginationPagesCount || 0,
        onPageChange,
        page: toNumber(page),
        perPage,
    }

    const error = searchByTitleQuery.data?.Error ?? searchByTitleQuery.error
    return {
        searchByTitleQuery,
        pagination,
        onSearchQueryChange,
        error,
        searchQuery,
    }
}
