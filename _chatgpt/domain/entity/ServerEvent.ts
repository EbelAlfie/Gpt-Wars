export type ServerEvent = {
    data: string,
    event: string,
    id: string,
    retry: number
}

export type ServerData = {
    channel: number,
    op: string,
    path: string,
    value: string
}

export const EventCodes: Array<[ServerCode, ServerKey]> = [
    ['channel', 'c'],
    ['path', 'p'],
    ['op', 'o'],
    ['value', 'v']
]

type ServerCode = 'channel'| 'path'| 'op'| 'value'
type ServerKey = 'c'| 'p'| 'o'| 'v'
