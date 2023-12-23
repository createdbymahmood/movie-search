import {useWindowWidth} from '@react-hook/window-size'
import type {RefObject} from 'react'
import {useLayoutEffect, useState} from 'react'

export function useOverflow(ref: RefObject<HTMLElement>): {
    refXOverflowing: boolean
    refYOverflowing: boolean
    refXScrollBegin: boolean
    refXScrollEnd: boolean
    refYScrollBegin: boolean
    refYScrollEnd: boolean
} {
    const [refXOverflowing, setRefXOverflowing] = useState(false)
    const [refYOverflowing, setRefYOverflowing] = useState(false)
    const [refXScrollBegin, setRefXScrollBegin] = useState(true)
    const [refXScrollEnd, setRefXScrollEnd] = useState(false)
    const [refYScrollBegin, setRefYScrollBegin] = useState(true)
    const [refYScrollEnd, setRefYScrollEnd] = useState(false)
    const width = useWindowWidth()

    useLayoutEffect((): any => {
        if (!ref.current) {
            return
        }

        const isXOverflowing = ref.current.scrollWidth > ref.current.clientWidth

        const isYOverflowing =
            ref.current.scrollHeight > ref.current.clientHeight

        if (refXOverflowing !== isXOverflowing) {
            setRefXOverflowing(isXOverflowing)
        }

        if (refYOverflowing !== isYOverflowing) {
            setRefYOverflowing(isYOverflowing)
        }

        const handleScroll = (): void => {
            // Handle X Overflow
            const offsetRight =
                /* @ts-ignore bypassing TS errors  */
                ref.current?.scrollWidth - ref.current?.clientWidth

            if (
                /* @ts-ignore bypassing TS errors  */
                ref.current?.scrollLeft >= offsetRight &&
                !refXScrollEnd
            ) {
                setRefXScrollEnd(true)
            } else {
                setRefXScrollEnd(false)
            }

            if (ref.current?.scrollLeft === 0) {
                setRefXScrollBegin(true)
            } else {
                setRefXScrollBegin(false)
            }

            // Handle Y Overflow
            const offsetBottom =
                /* @ts-ignore bypassing TS errors  */
                ref.current?.scrollHeight - ref.current?.clientHeight

            if (
                /* @ts-ignore bypassing TS errors  */
                ref.current?.scrollTop >= offsetBottom &&
                !refYScrollEnd
            ) {
                setRefYScrollEnd(true)
            } else {
                setRefYScrollEnd(false)
            }

            if (ref.current?.scrollTop === 0) {
                setRefYScrollBegin(true)
            } else {
                setRefYScrollBegin(false)
            }
        }

        ref.current.addEventListener('scroll', handleScroll)

        return (): void =>
            ref.current?.removeEventListener('scroll', handleScroll)
    }, [ref, width]) // Empty array ensures that effect is only run on mount and unmount

    return {
        refXOverflowing,
        refYOverflowing,
        refXScrollBegin,
        refXScrollEnd,
        refYScrollBegin,
        refYScrollEnd,
    }
}
