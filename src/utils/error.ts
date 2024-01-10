import {isAxiosError} from 'axios'
import {get, isString} from 'lodash'

import {DEFAULT_ERROR_MESSAGE} from '~~/configs/constants'

export type NextAuthError = 'CredentialsSignin'

export const transformNextAuthErrorToReadableMessages = (
    error: NextAuthError,
) => {
    switch (error) {
        case 'CredentialsSignin':
            return 'Email or password is incorrect'

        default:
            return DEFAULT_ERROR_MESSAGE
    }
}

export const toClientErrorMessage = (error: unknown): string => {
    try {
        if (isAxiosError(error)) {
            const errorFromResponse = get(error, 'response.data.status_message')
            return errorFromResponse ?? get(error, 'message')
        }
        if (isString(error)) return error
        if (Boolean(get(error, 'message'))) return (error as Error).message
        const errorMessage = get(error, ['data', 'message'])
        return errorMessage ?? DEFAULT_ERROR_MESSAGE
    } catch {
        return DEFAULT_ERROR_MESSAGE
    }
}
