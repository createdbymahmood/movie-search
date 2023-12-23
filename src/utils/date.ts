import dayJs from 'dayjs'

export const transformISO8601ToYYYYFormat = (date: string) => {
    if (!dayJs(new Date(date)).isValid()) return 'UNKNOWN_RELEASE_DATE'
    return dayJs(date).format('YYYY')
}
