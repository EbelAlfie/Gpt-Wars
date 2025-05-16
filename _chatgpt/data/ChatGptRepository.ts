"use client"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { MeResponse } from "./model/MeResponse"
import { ChatRequirementResponse } from "./model/ChatRequirementResponse"
import { ChatRequirementRequest } from "@/_chatgpt/domain/model/ChatRequirementRequest"
import { ConversationRequest } from "@/_chatgpt/domain/model/ConversationRequest"

export class ChatGptRepository {
    webSocket: WebSocket| null = null
    deviceId = process.env.NEXT_PUBLIC_DEVICE_ID

    constructor() {}

    async initMe(): Promise<AxiosResponse<MeResponse, any>> {
        const config = {
            method: "GET",
            url: "https://chatgpt.com/backend-anon/me"
        }

        return axios.request<any, AxiosResponse<MeResponse>, any>(config)
    }

    async getChatRequirement(request: ChatRequirementRequest): Promise<ChatRequirementResponse> {
        const config = {
            method: "POST",
            url: "https://chatgpt.com/backend-anon/sentinel/chat-requirements",
            data: request,
            headers: {
                "oai-device-id": this.deviceId
            }
        }
        return await axios.request<any, AxiosResponse<ChatRequirementResponse>, any>(config)
            .then(response => response.data)
    }

    async openConversation(request: ConversationRequest) {
        let config: AxiosRequestConfig = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'https://chatgpt.com/backend-anon/conversation',
            headers: { 
                "oai-device-id": this.deviceId,
                "openai-sentinel-turnstile-token": request.turnstileToken,
                "openai-sentinel-proof-token": request.proofToken,
                "openai-sentinel-chat-requirements-token": request.chatRequirementToken,
                
                'accept': 'text/event-stream',             
                'content-type': 'application/json'
            },
            data: request.requestBody,
            adapter: "fetch",
            responseType: "stream"
        };
    
        console.log(config.headers)
        return await axios.request<any, AxiosResponse<ReadableStream, any>>(config)
            .then(response => response.data)
    }
}