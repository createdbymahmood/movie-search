import {isNull, toString} from 'lodash'
import type {ReadonlyURLSearchParams} from 'next/navigation'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import * as React from 'react'

interface UseSearchQueryParamParams<T> {
    key: string
    defaultValue?: T
}

export const createQueryString =
    (search: ReadonlyURLSearchParams) => (name: string, value: string) => {
        const params = new URLSearchParams(search)
        params.set(name, value)

        return params.toString()
    }

export function useSearchQueryParamState<T extends number | string>({
    key,
    defaultValue,
}: UseSearchQueryParamParams<T>) {
    const searchParams = useSearchParams()
    const setQueryString = createQueryString(searchParams)

    const readDefaultValue = (): T => {
        const v = searchParams.get(key)
        return (isNull(v) ? defaultValue : v) as T
    }

    const [searchQueryParam, setSearchQueryParam] =
        React.useState<T>(readDefaultValue)

    const pathname = usePathname()
    const router = useRouter()

    const onSearchQueryChange = (value: T): void => {
        setSearchQueryParam(value)
        /* To update udpate SSR content */
        router.push(`${pathname}?${setQueryString(key, toString(value))}`)
    }

    return [searchQueryParam, onSearchQueryChange] as const
}
