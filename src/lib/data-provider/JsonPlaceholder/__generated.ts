/**
 * Generated by orval v6.21.0 🍺
 * Do not edit manually.
 * JSON Placeholder
 * Fake Online REST API for Testing and Prototyping
 * OpenAPI spec version: 1.0.0
 */
import {useQuery} from '@tanstack/react-query'
import type {
    QueryFunction,
    QueryKey,
    UseQueryOptions,
    UseQueryResult,
} from '@tanstack/react-query'
import {JsonPlaceholderInstance} from '../../axios'
import type {ErrorType} from '../../axios'
export type GetUsersParams = {
    /**
     * Filter by user ID
     */
    id?: number
    /**
     * Filter by user email address
     */
    email?: number
}

export type GetTodosParams = {
    /**
     * Filter by todo ID
     */
    id?: number
    /**
     * Filter by user ID
     */
    userId?: number
}

export type GetPhotosParams = {
    /**
     * Filter by photo ID
     */
    id?: number
    /**
     * Filter by album ID
     */
    albumId?: number
}

export type GetAlbumsParams = {
    /**
     * Filter by album ID
     */
    id?: number
    /**
     * Filter by user ID
     */
    userId?: number
}

export type GetCommentsParams = {
    /**
     * Filter by comment ID
     */
    id?: number
    /**
     * Filter by post ID
     */
    postId?: number
}

export type GetPostsParams = {
    /**
     * Filter by post ID
     */
    id?: number
    /**
     * Filter by user ID
     */
    userId?: number
}

export interface NotFoundError {
    [key: string]: any
}

export type UserCompany = {
    bs?: string
    catchPhrase?: string
    name?: string
}

export type UserAddressGeo = {
    lat?: string
    lng?: string
}

export type UserAddress = {
    city?: string
    geo?: UserAddressGeo
    street?: string
    suite?: string
    zipcode?: string
}

export interface User {
    address?: UserAddress
    company?: UserCompany
    email?: string
    id?: number
    name?: string
    phone?: string
    username?: string
    website?: string
}

export interface Todo {
    completed?: boolean
    id?: number
    title?: string
    userId?: number
}

export interface Photo {
    albumId?: number
    id?: number
    thumbnailUrl?: string
    title?: string
    url?: string
}

export interface Album {
    id?: number
    title?: string
    userId?: number
}

export interface Comment {
    body?: string
    email?: string
    id?: number
    name?: string
    postId?: number
}

export interface Post {
    body?: string
    id?: number
    title?: string
    userId?: number
}

/**
 * @summary Get all available posts
 */
export const getPosts = (params?: GetPostsParams, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<Post[]>({
        url: `/posts`,
        method: 'GET',
        params,
        signal,
    })
}

export const getGetPostsQueryKey = (params?: GetPostsParams) => {
    return [`/posts`, ...(params ? [params] : [])] as const
}

export const getGetPostsQueryOptions = <
    TData = Awaited<ReturnType<typeof getPosts>>,
    TError = ErrorType<unknown>,
>(
    params?: GetPostsParams,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData>
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetPostsQueryKey(params)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPosts>>> = ({
        signal,
    }) => getPosts(params, signal)

    return {queryKey, queryFn, ...queryOptions} as UseQueryOptions<
        Awaited<ReturnType<typeof getPosts>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetPostsQueryResult = NonNullable<
    Awaited<ReturnType<typeof getPosts>>
>
export type GetPostsQueryError = ErrorType<unknown>

/**
 * @summary Get all available posts
 */
export const useGetPosts = <
    TData = Awaited<ReturnType<typeof getPosts>>,
    TError = ErrorType<unknown>,
>(
    params?: GetPostsParams,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getPosts>>, TError, TData>
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetPostsQueryOptions(params, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get specific post
 */
export const getPostsId = (id: number, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<Post>({
        url: `/posts/${id}`,
        method: 'GET',
        signal,
    })
}

export const getGetPostsIdQueryKey = (id: number) => {
    return [`/posts/${id}`] as const
}

export const getGetPostsIdQueryOptions = <
    TData = Awaited<ReturnType<typeof getPostsId>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getPostsId>>,
                TError,
                TData
            >
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetPostsIdQueryKey(id)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPostsId>>> = ({
        signal,
    }) => getPostsId(id, signal)

    return {
        queryKey,
        queryFn,
        enabled: !!id,
        ...queryOptions,
    } as UseQueryOptions<
        Awaited<ReturnType<typeof getPostsId>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetPostsIdQueryResult = NonNullable<
    Awaited<ReturnType<typeof getPostsId>>
>
export type GetPostsIdQueryError = ErrorType<NotFoundError>

/**
 * @summary Get specific post
 */
export const useGetPostsId = <
    TData = Awaited<ReturnType<typeof getPostsId>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getPostsId>>,
                TError,
                TData
            >
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetPostsIdQueryOptions(id, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get comments for a specific post
 */
export const getPostsIdComments = (id: number, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<Comment[]>({
        url: `/posts/${id}/comments`,
        method: 'GET',
        signal,
    })
}

export const getGetPostsIdCommentsQueryKey = (id: number) => {
    return [`/posts/${id}/comments`] as const
}

export const getGetPostsIdCommentsQueryOptions = <
    TData = Awaited<ReturnType<typeof getPostsIdComments>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getPostsIdComments>>,
                TError,
                TData
            >
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetPostsIdCommentsQueryKey(id)

    const queryFn: QueryFunction<
        Awaited<ReturnType<typeof getPostsIdComments>>
    > = ({signal}) => getPostsIdComments(id, signal)

    return {
        queryKey,
        queryFn,
        enabled: !!id,
        ...queryOptions,
    } as UseQueryOptions<
        Awaited<ReturnType<typeof getPostsIdComments>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetPostsIdCommentsQueryResult = NonNullable<
    Awaited<ReturnType<typeof getPostsIdComments>>
>
export type GetPostsIdCommentsQueryError = ErrorType<NotFoundError>

/**
 * @summary Get comments for a specific post
 */
export const useGetPostsIdComments = <
    TData = Awaited<ReturnType<typeof getPostsIdComments>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getPostsIdComments>>,
                TError,
                TData
            >
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetPostsIdCommentsQueryOptions(id, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get all available comments
 */
export const getComments = (
    params?: GetCommentsParams,
    signal?: AbortSignal,
) => {
    return JsonPlaceholderInstance<Comment[]>({
        url: `/comments`,
        method: 'GET',
        params,
        signal,
    })
}

export const getGetCommentsQueryKey = (params?: GetCommentsParams) => {
    return [`/comments`, ...(params ? [params] : [])] as const
}

export const getGetCommentsQueryOptions = <
    TData = Awaited<ReturnType<typeof getComments>>,
    TError = ErrorType<unknown>,
>(
    params?: GetCommentsParams,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getComments>>,
                TError,
                TData
            >
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetCommentsQueryKey(params)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getComments>>> = ({
        signal,
    }) => getComments(params, signal)

    return {queryKey, queryFn, ...queryOptions} as UseQueryOptions<
        Awaited<ReturnType<typeof getComments>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetCommentsQueryResult = NonNullable<
    Awaited<ReturnType<typeof getComments>>
>
export type GetCommentsQueryError = ErrorType<unknown>

/**
 * @summary Get all available comments
 */
export const useGetComments = <
    TData = Awaited<ReturnType<typeof getComments>>,
    TError = ErrorType<unknown>,
>(
    params?: GetCommentsParams,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getComments>>,
                TError,
                TData
            >
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetCommentsQueryOptions(params, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get specific comment
 */
export const getComment = (id: number, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<Comment>({
        url: `/comments/${id}`,
        method: 'GET',
        signal,
    })
}

export const getGetCommentQueryKey = (id: number) => {
    return [`/comments/${id}`] as const
}

export const getGetCommentQueryOptions = <
    TData = Awaited<ReturnType<typeof getComment>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getComment>>,
                TError,
                TData
            >
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetCommentQueryKey(id)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getComment>>> = ({
        signal,
    }) => getComment(id, signal)

    return {
        queryKey,
        queryFn,
        enabled: !!id,
        ...queryOptions,
    } as UseQueryOptions<
        Awaited<ReturnType<typeof getComment>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetCommentQueryResult = NonNullable<
    Awaited<ReturnType<typeof getComment>>
>
export type GetCommentQueryError = ErrorType<NotFoundError>

/**
 * @summary Get specific comment
 */
export const useGetComment = <
    TData = Awaited<ReturnType<typeof getComment>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getComment>>,
                TError,
                TData
            >
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetCommentQueryOptions(id, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get all available albums
 */
export const getAlbums = (params?: GetAlbumsParams, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<Album[]>({
        url: `/albums`,
        method: 'GET',
        params,
        signal,
    })
}

export const getGetAlbumsQueryKey = (params?: GetAlbumsParams) => {
    return [`/albums`, ...(params ? [params] : [])] as const
}

export const getGetAlbumsQueryOptions = <
    TData = Awaited<ReturnType<typeof getAlbums>>,
    TError = ErrorType<unknown>,
>(
    params?: GetAlbumsParams,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getAlbums>>,
                TError,
                TData
            >
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetAlbumsQueryKey(params)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAlbums>>> = ({
        signal,
    }) => getAlbums(params, signal)

    return {queryKey, queryFn, ...queryOptions} as UseQueryOptions<
        Awaited<ReturnType<typeof getAlbums>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetAlbumsQueryResult = NonNullable<
    Awaited<ReturnType<typeof getAlbums>>
>
export type GetAlbumsQueryError = ErrorType<unknown>

/**
 * @summary Get all available albums
 */
export const useGetAlbums = <
    TData = Awaited<ReturnType<typeof getAlbums>>,
    TError = ErrorType<unknown>,
>(
    params?: GetAlbumsParams,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getAlbums>>,
                TError,
                TData
            >
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetAlbumsQueryOptions(params, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get specific album
 */
export const getAlbumsId = (id: number, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<Album>({
        url: `/albums/${id}`,
        method: 'GET',
        signal,
    })
}

export const getGetAlbumsIdQueryKey = (id: number) => {
    return [`/albums/${id}`] as const
}

export const getGetAlbumsIdQueryOptions = <
    TData = Awaited<ReturnType<typeof getAlbumsId>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getAlbumsId>>,
                TError,
                TData
            >
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetAlbumsIdQueryKey(id)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAlbumsId>>> = ({
        signal,
    }) => getAlbumsId(id, signal)

    return {
        queryKey,
        queryFn,
        enabled: !!id,
        ...queryOptions,
    } as UseQueryOptions<
        Awaited<ReturnType<typeof getAlbumsId>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetAlbumsIdQueryResult = NonNullable<
    Awaited<ReturnType<typeof getAlbumsId>>
>
export type GetAlbumsIdQueryError = ErrorType<NotFoundError>

/**
 * @summary Get specific album
 */
export const useGetAlbumsId = <
    TData = Awaited<ReturnType<typeof getAlbumsId>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getAlbumsId>>,
                TError,
                TData
            >
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetAlbumsIdQueryOptions(id, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get photos for a specific album
 */
export const getAlbumsIdPhotos = (id: number, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<Photo[]>({
        url: `/albums/${id}/photos`,
        method: 'GET',
        signal,
    })
}

export const getGetAlbumsIdPhotosQueryKey = (id: number) => {
    return [`/albums/${id}/photos`] as const
}

export const getGetAlbumsIdPhotosQueryOptions = <
    TData = Awaited<ReturnType<typeof getAlbumsIdPhotos>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getAlbumsIdPhotos>>,
                TError,
                TData
            >
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetAlbumsIdPhotosQueryKey(id)

    const queryFn: QueryFunction<
        Awaited<ReturnType<typeof getAlbumsIdPhotos>>
    > = ({signal}) => getAlbumsIdPhotos(id, signal)

    return {
        queryKey,
        queryFn,
        enabled: !!id,
        ...queryOptions,
    } as UseQueryOptions<
        Awaited<ReturnType<typeof getAlbumsIdPhotos>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetAlbumsIdPhotosQueryResult = NonNullable<
    Awaited<ReturnType<typeof getAlbumsIdPhotos>>
>
export type GetAlbumsIdPhotosQueryError = ErrorType<NotFoundError>

/**
 * @summary Get photos for a specific album
 */
export const useGetAlbumsIdPhotos = <
    TData = Awaited<ReturnType<typeof getAlbumsIdPhotos>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getAlbumsIdPhotos>>,
                TError,
                TData
            >
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetAlbumsIdPhotosQueryOptions(id, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get all available photos
 */
export const getPhotos = (params?: GetPhotosParams, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<Photo[]>({
        url: `/photos`,
        method: 'GET',
        params,
        signal,
    })
}

export const getGetPhotosQueryKey = (params?: GetPhotosParams) => {
    return [`/photos`, ...(params ? [params] : [])] as const
}

export const getGetPhotosQueryOptions = <
    TData = Awaited<ReturnType<typeof getPhotos>>,
    TError = ErrorType<unknown>,
>(
    params?: GetPhotosParams,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getPhotos>>,
                TError,
                TData
            >
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetPhotosQueryKey(params)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPhotos>>> = ({
        signal,
    }) => getPhotos(params, signal)

    return {queryKey, queryFn, ...queryOptions} as UseQueryOptions<
        Awaited<ReturnType<typeof getPhotos>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetPhotosQueryResult = NonNullable<
    Awaited<ReturnType<typeof getPhotos>>
>
export type GetPhotosQueryError = ErrorType<unknown>

/**
 * @summary Get all available photos
 */
export const useGetPhotos = <
    TData = Awaited<ReturnType<typeof getPhotos>>,
    TError = ErrorType<unknown>,
>(
    params?: GetPhotosParams,
    options?: {
        query?: Partial<
            UseQueryOptions<
                Awaited<ReturnType<typeof getPhotos>>,
                TError,
                TData
            >
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetPhotosQueryOptions(params, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get specific photo
 */
export const getPhoto = (id: number, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<Photo>({
        url: `/photos/${id}`,
        method: 'GET',
        signal,
    })
}

export const getGetPhotoQueryKey = (id: number) => {
    return [`/photos/${id}`] as const
}

export const getGetPhotoQueryOptions = <
    TData = Awaited<ReturnType<typeof getPhoto>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getPhoto>>, TError, TData>
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetPhotoQueryKey(id)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPhoto>>> = ({
        signal,
    }) => getPhoto(id, signal)

    return {
        queryKey,
        queryFn,
        enabled: !!id,
        ...queryOptions,
    } as UseQueryOptions<
        Awaited<ReturnType<typeof getPhoto>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetPhotoQueryResult = NonNullable<
    Awaited<ReturnType<typeof getPhoto>>
>
export type GetPhotoQueryError = ErrorType<NotFoundError>

/**
 * @summary Get specific photo
 */
export const useGetPhoto = <
    TData = Awaited<ReturnType<typeof getPhoto>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getPhoto>>, TError, TData>
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetPhotoQueryOptions(id, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get all available todos
 */
export const getTodos = (params?: GetTodosParams, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<Todo[]>({
        url: `/todos`,
        method: 'GET',
        params,
        signal,
    })
}

export const getGetTodosQueryKey = (params?: GetTodosParams) => {
    return [`/todos`, ...(params ? [params] : [])] as const
}

export const getGetTodosQueryOptions = <
    TData = Awaited<ReturnType<typeof getTodos>>,
    TError = ErrorType<unknown>,
>(
    params?: GetTodosParams,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getTodos>>, TError, TData>
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetTodosQueryKey(params)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTodos>>> = ({
        signal,
    }) => getTodos(params, signal)

    return {queryKey, queryFn, ...queryOptions} as UseQueryOptions<
        Awaited<ReturnType<typeof getTodos>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetTodosQueryResult = NonNullable<
    Awaited<ReturnType<typeof getTodos>>
>
export type GetTodosQueryError = ErrorType<unknown>

/**
 * @summary Get all available todos
 */
export const useGetTodos = <
    TData = Awaited<ReturnType<typeof getTodos>>,
    TError = ErrorType<unknown>,
>(
    params?: GetTodosParams,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getTodos>>, TError, TData>
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetTodosQueryOptions(params, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get specific todo
 */
export const getTodo = (id: number, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<Todo>({
        url: `/todos/${id}`,
        method: 'GET',
        signal,
    })
}

export const getGetTodoQueryKey = (id: number) => {
    return [`/todos/${id}`] as const
}

export const getGetTodoQueryOptions = <
    TData = Awaited<ReturnType<typeof getTodo>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getTodo>>, TError, TData>
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetTodoQueryKey(id)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getTodo>>> = ({
        signal,
    }) => getTodo(id, signal)

    return {
        queryKey,
        queryFn,
        enabled: !!id,
        ...queryOptions,
    } as UseQueryOptions<Awaited<ReturnType<typeof getTodo>>, TError, TData> & {
        queryKey: QueryKey
    }
}

export type GetTodoQueryResult = NonNullable<
    Awaited<ReturnType<typeof getTodo>>
>
export type GetTodoQueryError = ErrorType<NotFoundError>

/**
 * @summary Get specific todo
 */
export const useGetTodo = <
    TData = Awaited<ReturnType<typeof getTodo>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getTodo>>, TError, TData>
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetTodoQueryOptions(id, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get all available users
 */
export const getUsers = (params?: GetUsersParams, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<User[]>({
        url: `/users`,
        method: 'GET',
        params,
        signal,
    })
}

export const getGetUsersQueryKey = (params?: GetUsersParams) => {
    return [`/users`, ...(params ? [params] : [])] as const
}

export const getGetUsersQueryOptions = <
    TData = Awaited<ReturnType<typeof getUsers>>,
    TError = ErrorType<unknown>,
>(
    params?: GetUsersParams,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetUsersQueryKey(params)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsers>>> = ({
        signal,
    }) => getUsers(params, signal)

    return {queryKey, queryFn, ...queryOptions} as UseQueryOptions<
        Awaited<ReturnType<typeof getUsers>>,
        TError,
        TData
    > & {queryKey: QueryKey}
}

export type GetUsersQueryResult = NonNullable<
    Awaited<ReturnType<typeof getUsers>>
>
export type GetUsersQueryError = ErrorType<unknown>

/**
 * @summary Get all available users
 */
export const useGetUsers = <
    TData = Awaited<ReturnType<typeof getUsers>>,
    TError = ErrorType<unknown>,
>(
    params?: GetUsersParams,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetUsersQueryOptions(params, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}

/**
 * @summary Get specific user
 */
export const getUser = (id: number, signal?: AbortSignal) => {
    return JsonPlaceholderInstance<User>({
        url: `/users/${id}`,
        method: 'GET',
        signal,
    })
}

export const getGetUserQueryKey = (id: number) => {
    return [`/users/${id}`] as const
}

export const getGetUserQueryOptions = <
    TData = Awaited<ReturnType<typeof getUser>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>
        >
    },
) => {
    const {query: queryOptions} = options ?? {}

    const queryKey = queryOptions?.queryKey ?? getGetUserQueryKey(id)

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUser>>> = ({
        signal,
    }) => getUser(id, signal)

    return {
        queryKey,
        queryFn,
        enabled: !!id,
        ...queryOptions,
    } as UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData> & {
        queryKey: QueryKey
    }
}

export type GetUserQueryResult = NonNullable<
    Awaited<ReturnType<typeof getUser>>
>
export type GetUserQueryError = ErrorType<NotFoundError>

/**
 * @summary Get specific user
 */
export const useGetUser = <
    TData = Awaited<ReturnType<typeof getUser>>,
    TError = ErrorType<NotFoundError>,
>(
    id: number,
    options?: {
        query?: Partial<
            UseQueryOptions<Awaited<ReturnType<typeof getUser>>, TError, TData>
        >
    },
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const queryOptions = getGetUserQueryOptions(id, options)

    const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
        queryKey: QueryKey
    }

    query.queryKey = queryOptions.queryKey

    return query
}
