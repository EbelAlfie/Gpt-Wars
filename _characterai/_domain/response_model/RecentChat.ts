import { RecentChatResponse } from "@/app/_characterai/_data/model/RecentChatResponse"

export type RecentChatModel = {
    chatId : string,
    characterAvatar: string,
    createTime: string,
    creatorId: string,
    characterId: string
}

export const mapRecentChat = ({ chats }: RecentChatResponse): RecentChatModel => {
    const {
        chat_id,
        character_avatar_uri,
        create_time,
        creator_id,
        character_id
    } = chats[0] ?? {} //first or last?

    const result: RecentChatModel= {
        chatId : chat_id ?? "",
        characterAvatar : character_avatar_uri ?? "",
        createTime: create_time ?? "",
        creatorId: creator_id ?? "",
        characterId: character_id ?? "",
    }
    return result
}