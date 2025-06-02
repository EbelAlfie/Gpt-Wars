import { Failed, Loaded, Loading } from "../../common/UiState";
import { AuthorModel } from "@/_characterai/_domain/response_model/ChatTurnHistory";

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
