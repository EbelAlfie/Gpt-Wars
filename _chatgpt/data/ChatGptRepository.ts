"use client"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { MeResponse } from "./model/MeResponse"
import { ChatRequirementResponse } from "./model/ChatRequirementResponse"
import { ChatRequirementRequest } from "@/_chatgpt/domain/model/ChatRequirementRequest"
import { ConversationRequest } from "@/_chatgpt/domain/model/ConversationRequest"
import { getUUID } from "@/_characterai/utils"

export class ChatGptRepository {
    webSocket: WebSocket| null = null
    deviceId = getUUID()  //process.env.NEXT_PUBLIC_DEVICE_ID

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
                "oai-client-version": "prod-02d5971a6514a9ecc0e24d5d1ab08e89a8dbab5f",
                "oai-echo-logs": "0,4543,1,5166,0,6107,1,6127,0,6177,1,9548",
                "oai-language": "en-US",
                "oai-device-id": this.deviceId,
                "openai-sentinel-turnstile-token": request.turnstileToken,
                "openai-sentinel-proof-token": request.proofToken,
                "openai-sentinel-chat-requirements-token": request.chatRequirementToken,

                "cookie": `
                    oai-did=${this.deviceId}; oai-nav-state=1; oai-sh-c-i=67d91971-cb28-8001-a3ff-1b41398e4efd; __Host-next-auth.csrf-token=aee8bd76e9863ae38c49789689367c7b1f1b6cb3def1d10af9160da7367e50f0%7C0050a5ae6a31ad763482339cd7b483b5716dcab014c62e0efc14f36e59713d75; __Secure-next-auth.callback-url=https%3A%2F%2Fchatgpt.com; _cfuvid=aOMhQJtSMfRWuqUFPP_04eUECE5th3D8o20UI28o1Ig-1747526809985-0.0.1.1-604800000; cf_clearance=JCGMZuzasS3A_O1szJVETBadzPxktMvedv0e8VgyUhg-1747529029-1.2.1.1-qikCjLRBxMWiS7TQqcjqMZIEoDmzWVEGykH76iRhuCQGdwBu_gFn3ceAERQ5bNrd6xcbxscKAarZwlaLl11vNXvx57xPuq8sQ1G_2KvrqAliC9Meu21F.PjEfypCv3zpgNrzAGkl.A6Ms8vfO8N1JO59FA959u1ii7Y8EqPIIuMK1WMc5cG6MvYlBRsBbejF2jMcOiMEirNBNiqzE1F9ZhzWiSVQsjl_fHw9GLTH8KaB415gYpLVShAg0kyWCqg5f5Xdtf5Wb4pYrMRL_l_4y6k2dDdj6KdPc7ssDo7s_xvliHQJCnYmDEyXEAlZh7H8aMsg.GMGLsjfRBZgVmwgwk7zsEP7q.Ul0c.ZNbqnwTo; oai-cbs=%2F; oai-cbi=true; __cf_bm=PBU.bc7BmTATmC4SP7wLQHRUDSpJJe_rv.lkJQgT6Zg-1747533872-1.0.1.1-MNHFVT0YgvuBXWcK9HxuWzyQwrlc0pHC95RDnnoT7jdJ8bV_KgI4egwVoLHryVDwlhMHw4aWpizSRadOjRFETkpBjfY7es.FVyVV1iX0jNo; __cflb=04dTofELUVCxHqRn2XQ4aeUaTCU9L8piYa3qzQ5aN7; oai-sc=0gAAAAABoKUJuKzY-OtmP9IzlRwULX5QRFq2gKFqnluCmJ_JoO0DahrXXcd4uRSYXVKiM3b5SVn1zoh8hd9qgseuROv5Px7avRt8-lrK6n31UpD4I_5cczao1KeKq8iZi8ZQJh5DXxadMON0DC9mMfH2IlYPG5VSp1xEyGk3dyIfwwRwmUGHKg6C6XL1yC3V6wFKcHznFLnBbQHH1XXuveRexu-xq8tcBlnN_aKQYxO0xG-iPJAtElKM; _dd_s=rum=0&expire=1747535350972&logs=1&id=${getUUID()}&created=1747529235899
                `,
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