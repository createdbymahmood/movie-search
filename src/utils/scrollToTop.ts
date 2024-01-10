import {isSSR} from '@/utils/isSSR'

export function scrollToTop() {
    if (isSSR) return
    window.scrollTo({top: 0})
}
