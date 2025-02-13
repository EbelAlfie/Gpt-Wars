export enum CompletionType {
    Next = "next",
    Variant = "variant"
}

export enum Role { 
    Root = "root",
    User = "user",
    Assistant = "assistant"
}

export enum ChatEvent {
    DeltaEncoding = "delta_encoding",
    Delta = "delta",
    Ping = "ping"
}

export const EventCodes = [
    ['channel', 'c'],
    ['path', 'p'],
    ['op', 'o'],
    ['value', 'v']
]

export const EventCode = {
    'c': 'channel',
    'p': 'path',
    'o': 'op',
    'v': 'value'
}