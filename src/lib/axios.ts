import type {AxiosError, AxiosRequestConfig} from 'axios'
import Axios from 'axios'

export const createAxiosInstance = (baseURL: string) => Axios.create({baseURL})

export const createCustomInstance =
    (baseURL: string) =>
    <T>(config: AxiosRequestConfig): Promise<T> => {
        const source = Axios.CancelToken.source()
        const promise = createAxiosInstance(baseURL)({
            ...config,
            cancelToken: source.token,
        }).then(({data}) => data)

        // @ts-ignore unknown
        promise.cancel = () => {
            source.cancel('Query was cancelled by React Query')
        }

        return promise
    }

export const OMDBAxiosInstance = createCustomInstance('omdb-url')
export const JsonPlaceholderInstance = createCustomInstance('jsonplaceholder')

export interface ErrorType<Error> extends AxiosError<Error> {}
