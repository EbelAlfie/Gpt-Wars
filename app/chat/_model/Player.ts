import { CharacterModel } from "@/_characterai/_domain/response_model/CharacterModel"
import { RecentChatModel } from "@/_characterai/_domain/response_model/RecentChat"

export type Player = {
    recentChat: RecentChatModel,
    model: CharacterModel
}