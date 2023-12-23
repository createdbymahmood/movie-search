import {Container, Loader, useMantineTheme} from '@mantine/core'
import {useSession} from 'next-auth/react'

export function withAuth<T extends object>(WrappedComponent: React.FC<T>) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component'

    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithAuth = (props: T) => {
        const session = useSession()
        const theme = useMantineTheme()
        // Fetch the props you want to inject. This could be done with context instead.

        if (session.status === 'loading') {
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return (
                <Container py={theme.spacing.lg}>
                    <Loader size={20} />
                </Container>
            )
        }

        // props comes afterwards so the can override the default ones.
        return <WrappedComponent {...props} />
    }

    ComponentWithAuth.displayName = `withAuth(${displayName})`

    return ComponentWithAuth
}
