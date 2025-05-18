"use client"
import { getRequirementsToken } from "@/_chatgpt/data/utilChatGpt";
import { ChatGptUseCase } from "@/_chatgpt/domain/ChatGptUseCase";
import { createMessage } from "../../../app/utils/utils";
import { Role } from "@/common/Constants";
import { Message } from "@/_chatgpt/domain/entity/Message";
import { ServerEvent } from "@/_chatgpt/domain/entity/ServerEvent";
import { ChatState } from "../../../app/components/state/ChatState";
import { GptMessageProcessor } from "../GptMessageProcessor";

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

    const messageRequest = createMessage(Role.User, message)

    const chatStream = await useCase.openConversation(
        messageRequest, 
        chatRequirement,
        lastChat?.id ?? crypto.randomUUID(),
        onStreaming
    )
    if (chatStream instanceof Error) {
        onChatState(chatStream)
        return 
    }
}