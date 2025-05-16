import { ChatGptRepository } from "@/_chatgpt/data/ChatGptRepository";
import { ChatRequirementRequest } from "./model/ChatRequirementRequest";
import { ConversationRequest } from "./model/ConversationRequest";
import { decoder, HD } from "@/_chatgpt/data/utilChatGpt";
import { ServerEvent } from "./entity/ServerEvent";

export class ChatGptUseCase {
    repository: ChatGptRepository = new ChatGptRepository()

    async initMe() {
        return this.repository.initMe()
    }

    async getChatRequirement(request: ChatRequirementRequest) {
        return this.repository.getChatRequirement(request)
        .then(response => {
            return response
        })
        .catch(error => {
            console.log(error)
            return error
        })
    }

    async openConversation(request: ConversationRequest, onStreaming: (value: ServerEvent) => void) {
        return this.repository.openConversation(request)
            .then((responseStream: ReadableStream) => {
                this._streamProcessor(responseStream, HD(decoder(
                    (message: ServerEvent) => {
                        console.log(message)
                        onStreaming(message)
                    }
                )))
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }

    _streamProcessor = async (
        stream: ReadableStream,
        onStreaming: (arg: Uint8Array) => void
    ) => {
        const reader = stream.getReader()
        let temp;
        for (; !(temp = await reader.read()).done; )
            onStreaming(temp.value)
    }
}