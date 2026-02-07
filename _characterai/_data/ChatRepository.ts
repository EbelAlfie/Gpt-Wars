"use client"
import axios, { AxiosResponse } from "axios"
import { discoverCharacter, fetchRecentChat, getCharacterInfo, loadChatHistory, resurrectCharacter, searchCharacter } from "../action/ChatAction"
import { CharacterResponse } from "./model/CharacterResponse"
import { CharacterDetailResponse, DetailResponse } from "./model/DetailResponse"
import { RecentChatResponse } from "./model/RecentChatResponse"
import { TurnResponse } from "./model/TurnResponse"

export class ChatRepository {
    webSocket: WebSocket | null = null
    token: string| undefined = process.env.NEXT_PUBLIC_TOKEN

    public onMessage(event: MessageEvent) {}
    
    public onOpen(event: Event) { }

    public onError(event: Event) { }

    public sendMessage(message: string) {
        this.webSocket?.send(message)
    }

    public openChatConnection() {
        this.webSocket = new WebSocket("wss://neo.character.ai/ws/") 
        this.webSocket.onopen = this.onOpen.bind(this)
        this.webSocket.onmessage = this.onMessage.bind(this)
        this.webSocket.onerror = this.onError.bind(this)  
    }

    public closeConnection() {
        this.webSocket?.close()
        this.webSocket = null
    }

    public async resurectCharacter(chatId: string) {
        return resurrectCharacter(chatId, this.token)
    }

    public async fetchRecentChat(characterId: string): Promise<RecentChatResponse> {
        return fetchRecentChat(characterId, this.token)
            .then((response: RecentChatResponse) => {
                return response
            })
    }

    public async searchCharacter(query: string): Promise<CharacterResponse> { 
        return searchCharacter(query, this.token)
            .then(response => { 
                return response  
            })
    }

    public async loadChatHistory(chatId: string): Promise<TurnResponse> {
        return loadChatHistory(chatId, this.token)
            .then((response: TurnResponse) => {
                return response
            })
    }
    public async discoverAll(): Promise<CharacterResponse> {
        return discoverCharacter()
            .then((response: CharacterResponse) => {
                return response
            })
    }

    public async getCharacterInfo(charId: string): Promise<DetailResponse> {
        return getCharacterInfo(charId, this.token)
    }
}