"use client"
import { constructTurnsTileToken, getEnforcementToken, getRequirementsToken } from "@/_chatgpt/data/utilChatGpt";
import { ChatGptUseCase } from "@/_chatgpt/domain/ChatGptUseCase";
import { createMessage } from "../utils/utils";
import { CompletionType, OperationTypes, Role } from "@/common/Constants";
import { MessageRequest } from "@/_chatgpt/domain/model/ConversationRequest";
import { Message } from "@/_chatgpt/domain/entity/Message";
import { ServerData, ServerEvent } from "@/_chatgpt/domain/entity/ServerEvent";
import { ChatState } from "../components/state/ChatState";
import { GptMessageProcessor } from "../../_chatgpt/presentation/GptMessageProcessor";

const processor = new GptMessageProcessor()

export const sendChat = async (
    useCase: ChatGptUseCase, 
    message: string,
    lastChat: Message| undefined,
    onChatState: (state: ChatState) => void 
) => {
    const requirementToken = { "p": getRequirementsToken() }
    const chatRequirement = await useCase.getChatRequirement(requirementToken)
    if (chatRequirement instanceof Error) {
        onChatState(chatRequirement)
        return 
    }

    const onStreaming = (message: ServerEvent) => {
        if (message.event === "[DONE]") {

        } else if (message.event !== "ping") 
            try {
                if (message.data === "v1") return

                // let data = JSON.parse(message.data)
                const list = processor.process(message.data)
                console.log(`datas: ${list}`)
                onChatState(list)
            } catch (error) {
                console.log(error)
                onChatState(Error("error"))
            }
    }

    const turntileToken = await constructTurnsTileToken(chatRequirement.turnstile.dx)
    const proofToken = getEnforcementToken(chatRequirement)

    const parentMessageId = lastChat?.id ?? "aaa15024-086f-4f9b-9ed9-7a4aeddaf679"
    const messageRequest = createMessage(Role.User, message)

    const chatStream = await useCase.openConversation({
            chatRequirementToken: chatRequirement.token,
            turnstileToken: turntileToken,
            proofToken: proofToken ?? "",
            requestBody: {
                    action: CompletionType.Next,
                    messages: [messageRequest],
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
        },
        onStreaming
    )
    if (chatStream instanceof Error) {
        onChatState(chatStream)
        return 
    }
}