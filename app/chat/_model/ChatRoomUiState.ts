import { Failed, Loaded, Loading } from "../../common/UiState";
import { Message } from "./Message";
import { AuthorModel } from "@/_characterai/_domain/response_model/ChatTurnHistory";

export type ChatRoomState = Loading | Loaded<Message[]> | Failed

export type ChatRoomUiState = Loading | Loaded<ChatListState> | Failed

export type ChatListState = {
    chatList: ChatListModel[]
}

export type ChatListModel = {
    turnId: string,
    message: string,
    author: AuthorModel,
    authorAvatar: string,
    createTime: string
}
