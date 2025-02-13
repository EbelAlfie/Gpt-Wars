"use server"

import { ChatRequirementRequest } from "@/domain/chatgpt/model/ChatRequirementRequest"
import axios, { AxiosResponse } from "axios"
import { ChatRequirementResponse } from "../model/ChatRequirementResponse"
import { ConversationRequest } from "@/domain/chatgpt/model/ConversationRequest"

const deviceId = process.env.NEXT_APP_DEVICE_ID

export async function getChatRequirement(
    request: ChatRequirementRequest
) {
    const config = {
        method: "POST",
        url: "https://chatgpt.com/backend-anon/sentinel/chat-requirements",
        data: request,
        headers: {
            "oai-device-id": deviceId
        }
    }
    return await axios.request<any, AxiosResponse<ChatRequirementResponse>, any>(config)
        .then(response => response.data)
}
export async function startConversation(
    request: ConversationRequest
) {
    let config = {
        method: 'POST',
        maxBodyLength: Infinity,
        url: 'https://chatgpt.com/backend-anon/conversation',
        headers: { 
            "oai-device-id": deviceId,
            "openai-sentinel-turnstile-token": request.turnstileToken,
            "openai-sentinel-proof-token": request.proofToken,
            "openai-sentinel-chat-requirements-token": request.chatRequirementToken,
            'accept': 'text/event-stream',             
            'content-type': 'application/json', 
        }
    };

    console.log(config.headers)
    return await axios.request(config)
        .then(response => response.data)
}