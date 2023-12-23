import {Button, Checkbox, Menu, Stack} from '@mantine/core'
import * as React from 'react'

import {
    sortByOptions,
    useMovieQueryParamStates,
} from '@/components/movies/MovieSearch/useMovieQueryParamStates'

export const MovieSearchFilters: React.FC = () => {
    const [queryParams, setQueryParams] = useMovieQueryParamStates()

    return (
        <Menu shadow='md' width='auto'>
            <Menu.Target>
                <Button>Sort By</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Sort by</Menu.Label>

                <Menu.Item>
                    <Stack style={{flexDirection: 'row'}}>
                        <Checkbox
                            defaultChecked={queryParams.includeAdult}
                            onChange={(e) =>
                                setQueryParams({includeAdult: e.target.checked})
                            }
                        />
                        Include adult
                    </Stack>
                </Menu.Item>

                {Object.entries(sortByOptions).map(([key, value]) => {
                    return (
                        <Menu.Item
                            key={key}
                            onClick={() => setQueryParams({sortBy: key})}
                        >
                            {value}
                        </Menu.Item>
                    )
                })}
            </Menu.Dropdown>
        </Menu>
    )
}
