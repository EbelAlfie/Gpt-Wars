import { Message } from "@/app/chat/_model/Message";
import { MessageRequest } from "../model/ConversationRequest";
import { ServerData } from "./ServerEvent";

export function mapToMessage(response: MessageRequest) : Message {
    return {
        id: response?.id ?? "",
        author: response.author.role,
        content: response.content.parts[0]
    }
}

/**Either construct a message Object or get the raw Value */
export function mapServerDataToMessage(data: ServerData) : Message {
    let message
    try {
        console.log("data.value")
        console.log(data.value)
        message = data.value
    } catch(error) {
        console.log(error)
        message = data.value
    }

    return {
        id: message?.id ?? "",
        author: message?.author.role,
        content: message?.content?.parts[0] ?? message
    }
}