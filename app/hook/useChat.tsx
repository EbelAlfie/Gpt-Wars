"use client"
import { constructTurnsTileToken, getEnforcementToken, getRequirementsToken } from "@/data/util";
import { ChatGptUseCase } from "@/domain/ChatGptUseCase";
import { createMessage } from "../utils/utils";
import { CompletionType, Role } from "@/common/Constants";
import { MessageRequest } from "@/domain/model/ConversationRequest";
import { Message } from "@/domain/entity/Message";

export const sendChat = async (
    useCase: ChatGptUseCase, 
    message: string,
    lastChat: Message| undefined 
) => {
    const requirementToken = { "p": getRequirementsToken() }
    console.log("PE " + requirementToken.p)
    const chatRequirement = await useCase.getChatRequirement(requirementToken)
    if (chatRequirement instanceof Error) {
        
    }

    const turntileToken = await constructTurnsTileToken(chatRequirement.turnstile.dx)
    const proofToken = getEnforcementToken(chatRequirement)

    const parentMessageId = lastChat?.id ?? "aaa15024-086f-4f9b-9ed9-7a4aeddaf679"
    const messageRequest = createMessage(Role.User, message)
    const conversationRequest = await useCase.openConversation({
        chatRequirementToken: chatRequirement.token,
        turnstileToken: turntileToken,
        proofToken: proofToken?? "",
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
    })

    console.log(conversationRequest)
}