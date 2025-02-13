import { MessageRequest } from "../model/ConversationRequest";

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