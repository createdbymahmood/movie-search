import {useCallbackRef} from '@mantine/hooks'
import {isEmpty, toNumber, toString} from 'lodash'

import {useMovieQueryParamStates} from '@/components/movies/MovieSearch/useMovieQueryParamStates'
import type {GetSearchMovieParams} from '@/lib/data-provider/TMDB/__generated'
import {useGetSearchMovie} from '@/lib/data-provider/TMDB/__generated'
import type {MoviesSearchResults} from '@/lib/data-provider/TMDB/types/search/movies'

export function useMovieSearchState() {
    const [queryParams, setQueryParams] = useMovieQueryParamStates()

    const page = toNumber(queryParams.page)
    const enabled = !isEmpty(queryParams.search)

    const searchByTitleQueryParams = {
        query: queryParams.search,
        page,
        sort_by: queryParams.sortBy,
        include_adult: queryParams.includeAdult,
    }

    const searchByTitleQuery = useGetSearchMovie<MoviesSearchResults>(
        searchByTitleQueryParams as unknown as GetSearchMovieParams,
        {query: {enabled}},
    )

    const onPageChange = useCallbackRef((value: number) => {
        setQueryParams({page: toString(value)})
    })

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
