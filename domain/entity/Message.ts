import { ChatEvent } from "@/common/Constants";
import { MessageRequest } from "../chatgpt/model/ConversationRequest";
import { ServerEvent } from "./ServerEvent";

export type Message = {
    id: string,
    author: string,
    content: string,
}

export function mapToMessage(response: MessageRequest) : Message {
    return {
        id: response?.id ?? "",
        author: response.author.role,
        content: response.content.parts[0]
    }
}
