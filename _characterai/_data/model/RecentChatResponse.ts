
export type RecentChatResponse = {
    chats: ChatResponse []
}

export type ChatResponse = {
    readonly chat_id : string,
    readonly character_avatar_uri: string,
    readonly create_time: string,
    readonly creator_id: string,
    readonly character_id: string
}