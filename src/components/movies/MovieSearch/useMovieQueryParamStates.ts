import {useQueryClient} from '@tanstack/react-query'
import {
    BooleanParam,
    StringParam,
    useQueryParams,
    withDefault,
} from 'use-query-params'

import {scrollToTop} from '@/utils/scrollToTop'

export const DEFAULT_MOVIES_PAGE_NUMBER = '1'
export const sortByOptions = {
    'popularity.asc': 'popularity.asc',
    'popularity.desc': 'popularity.desc',
    'release_date.asc': 'release_date.asc',
    'release_date.desc': 'release_date.desc',
    'revenue.asc': 'revenue.asc',
    'revenue.desc': 'revenue.desc',
    'primary_release_date.asc': 'primary_release_date.asc',
    'primary_release_date.desc': 'primary_release_date.desc',
    'original_title.asc': 'original_title.asc',
    'original_title.desc': 'original_title.desc',
    'vote_average.asc': 'vote_average.asc',
    'vote_average.desc': 'vote_average.desc',
    'vote_count.asc': 'vote_count.asc',
    'vote_count.des': 'vote_count.desc',
}
const queryParamsConfig = {
    search: withDefault(StringParam, ''),
    page: withDefault(StringParam, DEFAULT_MOVIES_PAGE_NUMBER),
    sortBy: withDefault(StringParam, sortByOptions['popularity.asc']),
    includeAdult: withDefault(BooleanParam, false),
}

export function useMovieQueryParamStates() {
    const [queryParams, setQueryParams] = useQueryParams(queryParamsConfig, {
        updateType: 'pushIn',
    })

    const _setQueryParams = (...args: Parameters<typeof setQueryParams>) => {
        setQueryParams(...args)
        scrollToTop()
    }

    return [queryParams, _setQueryParams] as const
}
export type UseMovieQueryParamStatesReturnType = ReturnType<
    typeof useMovieQueryParamStates
>
