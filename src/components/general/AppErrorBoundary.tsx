import {Button} from '@mantine/core'
import {QueryErrorResetBoundary} from '@tanstack/react-query'
import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

import {toClientErrorMessage} from '@/utils/error'

export interface ErrorBoundaryProps {
    children: React.ReactNode
}

export const AppErrorBoundary: React.FC<ErrorBoundaryProps> = ({children}) => {
    return (
        <QueryErrorResetBoundary>
            {({reset}) => (
                <ErrorBoundary
                    fallbackRender={({resetErrorBoundary, error}) => (
                        <div>
                            {toClientErrorMessage(error)}

                            <Button onClick={() => resetErrorBoundary()}>
                                Try again
                            </Button>
                        </div>
                    )}
                    onReset={reset}
                >
                    {children}
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    )
}
