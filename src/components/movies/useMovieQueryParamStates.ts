import {useSearchQueryParamState} from '@/hooks/useSearchQueryParamState'

export const DEFAULT_MOVIES_PAGE_NUMBER = '1'

export function useMovieQueryParamStates() {
    const [searchQuery, setSearchQuery] = useSearchQueryParamState<string>({
        key: 'search',
    })
    const [page, setPage] = useSearchQueryParamState<string>({
        key: 'page',
        defaultValue: DEFAULT_MOVIES_PAGE_NUMBER,
    })

    return [
        {
            value: searchQuery,
            set: setSearchQuery,
        },
        {
            value: page,
            set: setPage,
        },
    ] as const
}
