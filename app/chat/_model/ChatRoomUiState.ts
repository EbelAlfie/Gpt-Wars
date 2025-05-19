import { Failed, Loaded, Loading } from "../../common/UiState";
import { Message } from "./Message";

export type ChatRoomState = Loading | Loaded<Message> | Failed