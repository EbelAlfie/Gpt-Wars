import axios, { AxiosResponse } from "axios"
import { MeResponse } from "./model/MeResponse"

class ChatGptRepository {
    webSocket: WebSocket| null = null

    constructor() {}

    onOpen(event: Event) {}
    onError(event: Event) {}
    onMessage(event: MessageEvent) {}

    openWebsocket() {
        this.webSocket = new WebSocket("")
        this.webSocket.onopen = this.onOpen
        this.webSocket.onmessage = this.onMessage
        this.webSocket.onerror = this.onError
    }

    async initMe(): Promise<AxiosResponse<MeResponse, any>> {
        const config = {
            method: "GET",
            url: "https://chatgpt.com/backend-anon/me"
        }

        return axios.request<any, AxiosResponse<MeResponse>, any>(config)
    }

    async openConversation() {
        let data = JSON.stringify({});

            let config = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: 'https://chatgpt.com/backend-anon/conversation',
                headers: { 
                    
                },
                data : data
            };

        return axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}