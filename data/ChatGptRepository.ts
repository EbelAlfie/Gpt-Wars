import axios, { AxiosResponse } from "axios"
import { MeResponse } from "./model/MeResponse"
import { ChatRequirementResponse } from "./model/ChatRequirementResponse"
import { ChatRequirementRequest } from "@/domain/model/ChatRequirementRequest"
import { ConversationRequest } from "@/domain/model/ConversationRequest"
import { getChatRequirement, startConversation } from "./action/Conversation"

export class ChatGptRepository {
    webSocket: WebSocket| null = null

    constructor() {}

    async initMe(): Promise<AxiosResponse<MeResponse, any>> {
        const config = {
            method: "GET",
            url: "https://chatgpt.com/backend-anon/me"
        }

        return axios.request<any, AxiosResponse<MeResponse>, any>(config)
    }

    async getChatRequirement(request: ChatRequirementRequest): Promise<ChatRequirementResponse> {
        // return getChatRequirement(request)
        const deviceId = process.env.NEXT_PUBLIC_DEVICE_ID
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

    async openConversation(request: ConversationRequest) {
        // return startConversation(request)
        const deviceId = process.env.NEXT_PUBLIC_DEVICE_ID 
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
}