export type NextAuthError = 'CredentialsSignin'

export const transformNextAuthErrorToReadableMessages = (
    error: NextAuthError,
) => {
    switch (error) {
        case 'CredentialsSignin':
            return 'Email or password is incorrect'

        default:
            return 'Something went wrong'
    }
}
