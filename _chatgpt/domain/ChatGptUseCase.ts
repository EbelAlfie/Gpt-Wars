import { ChatGptRepository } from "@/_chatgpt/data/ChatGptRepository";
import { ChatRequirementRequest } from "./model/ChatRequirementRequest";
import { ConversationRequest, MessageRequest } from "./model/ConversationRequest";
import { constructTurnsTileToken, decoder, getEnforcementToken, HD } from "@/_chatgpt/data/utilChatGpt";
import { ServerEvent } from "./entity/ServerEvent";
import { ChatRequirementResponse } from "../data/model/ChatRequirementResponse";
import { CompletionType } from "@/common/Constants";
import { getUUID } from "@/_characterai/utils";

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

    async openConversation(request: MessageRequest, requirement: ChatRequirementResponse, lastChat: string|undefined, onStreaming: (value: ServerEvent) => void) {
        const turntileToken = await constructTurnsTileToken(requirement.turnstile.dx)
        const proofToken = getEnforcementToken(requirement)

        const parentMessageId = lastChat ?? getUUID()
        const conversationRequest = {
            chatRequirementToken: requirement.token,
            turnstileToken: turntileToken,
            proofToken: proofToken ?? "",
            requestBody: {
                    action: CompletionType.Next,
                    messages: [request],
                    parent_message_id: parentMessageId,
                    model:"auto",
                    timezone_offset_min:-420,
                    timezone:"Asia/Jakarta",
                    suggestions:[],
                    conversation_mode:{"kind":"primary_assistant"},
                    system_hints:[],
                    supports_buffering:true,
                    supported_encodings:["v1"],
                    client_contextual_info:{"is_dark_mode":true,"time_since_loaded":146,"page_height":968,"page_width":489,"pixel_ratio":1,"screen_height":1080,"screen_width":1920},
                    paragen_cot_summary_display_override:"allow"
            }
        }
        return this.repository.openConversation(conversationRequest)
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