import * as React from 'react'

interface UsePageStateParams {}

function usePageState(params: UsePageStateParams = {}) {
    return undefined
}

export interface PageProps {}

const Page: React.FC<PageProps> = (props) => {
    const state = usePageState()
    return <div>Hello World!</div>
}

export default Page
