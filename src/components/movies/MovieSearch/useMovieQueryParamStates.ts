import {StringParam, useQueryParams, withDefault} from 'use-query-params'

export const DEFAULT_MOVIES_PAGE_NUMBER = '1'

export function useMovieQueryParamStates() {
    const [queryParams, setQueryParams] = useQueryParams({
        search: withDefault(StringParam, ''),
        page: withDefault(StringParam, DEFAULT_MOVIES_PAGE_NUMBER),
    })

    return [queryParams, setQueryParams] as const
}
