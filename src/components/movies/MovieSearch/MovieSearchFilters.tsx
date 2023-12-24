import {Button, Checkbox, Menu, Stack} from '@mantine/core'
import {IconArrowsSort} from '@tabler/icons-react'
import * as React from 'react'

import {
    sortByOptions,
    useMovieQueryParamStates,
} from '@/components/movies/MovieSearch/useMovieQueryParamStates'

export const MovieSearchFilters: React.FC = () => {
    const [queryParams, setQueryParams] = useMovieQueryParamStates()

    const options = (
        <React.Fragment>
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
                const color = queryParams.sortBy === key ? 'red' : 'black'
                return (
                    <Menu.Item
                        key={key}
                        c={color}
                        onClick={() => setQueryParams({sortBy: key})}
                    >
                        {value}
                    </Menu.Item>
                )
            })}
        </React.Fragment>
    )

    return (
        <Menu shadow='md' width='auto'>
            <Menu.Target>
                <Button color='orange'>
                    <IconArrowsSort />
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Sort by</Menu.Label>
                {options}
            </Menu.Dropdown>
        </Menu>
    )
}
