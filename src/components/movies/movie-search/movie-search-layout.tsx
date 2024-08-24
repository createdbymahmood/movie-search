'use client'

import {Box, Button, Container, Loader, Stack, TextInput} from '@mantine/core'
import dynamic from 'next/dynamic'
import type {ReactNode} from 'react'
import type {SubmitHandler, UseFormProps} from 'react-hook-form'
import {useForm} from 'react-hook-form'

import {MovieSearchFilters} from '@/components/movies/movie-search/movie-search-filters'
import {
  DEFAULT_MOVIES_PAGE_NUMBER,
  useMovieQueryParamsState,
} from '@/components/movies/movie-search/use-movie-query-params-state'

const Navigation = dynamic(() => import('@/components/general/navigation'), {
  loading: () => <Loader size={36} />,
  ssr: false,
})

interface MovieSearchFormValues {
  search: string
}

function useMovieSearchInputState() {
  const [queryParams, setQueryParams] = useMovieQueryParamsState()
  const defaultMovieSearchFormProps: UseFormProps<
    MovieSearchFormValues,
    unknown
  > = {
    defaultValues: {search: queryParams.search},
  }
  const form = useForm<MovieSearchFormValues>(defaultMovieSearchFormProps)

  const onSubmit: SubmitHandler<MovieSearchFormValues> = ({search}) => {
    setQueryParams({search, page: DEFAULT_MOVIES_PAGE_NUMBER})
  }

  return {queryParams, form: {...form, onSubmit}}
}

const MovieSearchInput = () => {
  const state = useMovieSearchInputState()

  return (
    <Box
      component='form'
      w='100%'
      onSubmit={state.form.handleSubmit(state.form.onSubmit)}
    >
      <Stack style={{flexDirection: 'row'}}>
        <TextInput
          {...state.form.register('search')}
          defaultValue={state.queryParams.search}
          placeholder='eg: Interstellar...'
          style={{flex: 1}}
        />
        <MovieSearchFilters />
        <Button type='submit'>Search</Button>
      </Stack>
    </Box>
  )
}

interface MovieSearchLayoutProps {
  children?: ReactNode
}

export const MovieSearchLayout: React.FC<MovieSearchLayoutProps> = ({
  children,
}) => {
  return (
    <Container pb={50}>
      <Stack display='flex' h='100vh' py={50} style={{flexDirection: 'column'}}>
        <Navigation />

        <Stack style={{flexDirection: 'row'}}>
          <MovieSearchInput />
        </Stack>

        {children}
      </Stack>
    </Container>
  )
}
