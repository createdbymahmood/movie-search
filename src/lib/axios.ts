import type {AxiosError, AxiosRequestConfig} from 'axios'
import Axios from 'axios'
import {merge} from 'lodash'

import {env} from '~~/configs/env'

export const createAxiosInstance = (baseURL: string) => Axios.create({baseURL})

export const createCustomInstance =
    (baseURL: string, extraRequestConfig: AxiosRequestConfig = {}) =>
    <T>(config: AxiosRequestConfig): Promise<T> => {
        const source = Axios.CancelToken.source()

        const requstConfig: AxiosRequestConfig = {
            ...merge(config, extraRequestConfig),
            cancelToken: source.token,
        }

        const promise = createAxiosInstance(baseURL)(requstConfig).then(
            ({data}) => data,
        )

        // @ts-ignore unknown
        promise.cancel = () => {
            source.cancel('Query was cancelled by React Query')
        }

        return promise
    }

export const JsonPlaceholderInstance = createCustomInstance(
    env.JsonPlaceholderAPIURL,
)

export const TMDBInstance = createCustomInstance(env.TMDBAPIURL, {
    params: {api_key: env.TMDBAPIKey},
})

export interface ErrorType<Error> extends AxiosError<Error> {}
