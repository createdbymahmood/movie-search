import type {ErrorProps} from 'next/error'
import React from 'react'

import {toClientErrorMessage} from '@/utils/error'

export default function ErrorScreen(props: {error: ErrorProps}) {
    return <div>Error, {toClientErrorMessage(props.error)}</div>
}
