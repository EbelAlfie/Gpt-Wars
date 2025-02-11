import axios, { AxiosResponse } from "axios"
import { MeResponse } from "./model/MeResponse"
import { ChatRequirementResponse } from "./model/ChatRequirementResponse"
import { ChatRequirementRequest } from "@/domain/model/ChatRequirementRequest"
import { ConversationRequest } from "@/domain/model/ConversationRequest"

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

    async getChatRequirement(request: ChatRequirementRequest): Promise<AxiosResponse<ChatRequirementResponse, any>> {
        const config = {
            method: "POST",
            url: "https://chatgpt.com/backend-anon/sentinel/chat-requirements",
            data: request,
            headers: {
                "oai-device-id": process.env.NEXT_APP_DEVICE_ID
            }
        }
        return axios.request<any, AxiosResponse<ChatRequirementResponse>, any>(config)
    }

    async openConversation(request: ConversationRequest) {
        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'https://chatgpt.com/backend-anon/conversation',
            headers: { 
                "openai-sentinel-turnstile-token": request.turnstileToken,
                "openai-sentinel-proof-token": request.proofToken,
                "openai-sentinel-chat-requirements-token": request.chatRequirementToken,
                "content-type": "application/json",
                "accept": "text/event-stream"
            }
        };

        console.log(config.headers)
        return axios.request({})
    }
}