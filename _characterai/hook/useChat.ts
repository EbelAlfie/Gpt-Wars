import { useEffect, useRef, useState } from "react"
import { ChatUseCase } from "../_domain/ChatUseCase"
import { ChatRoomState } from "@/app/chat/_model/ChatRoomUiState"
import { setError, setLoaded, setLoading } from "@/app/common/UiState"
import { RecentChatModel } from "../_domain/response_model/RecentChat"
import { ChatTurnHistory } from "../_domain/response_model/ChatTurnHistory"
import { CommandType } from "../common/Const"

export const useChat = (
    useCase: ChatUseCase,
    openChat: Boolean,
): ChatRoomState => {
    const [chatRoomUiState, setChatRoomUiState] = useState<ChatRoomState>(setLoading())

    const uiStateRef = useRef(chatRoomUiState) //TODO optimize ? 
    useEffect(() => {uiStateRef.current = chatRoomUiState},[chatRoomUiState])

    useEffect(() => {
        if (!openChat) {
            useCase.closeWebsocketConnection()
            return
        }
        setChatRoomUiState(setLoading())

        let chatData: RecentChatModel
        
        const openWebsocket = async () => {
            const recentChat = await useCase.fetchRecentChat(character.characterAiData.characterId)
            if (recentChat instanceof Error) {
                setChatRoomUiState(setError(recentChat))
                return 
            }

            chatData = recentChat

            useCase.registerOpenListener(() => fetchInitialData())

            useCase.registerErrorListener((message: Event) => {
                setChatRoomUiState(setError(Error(JSON.stringify(message))))
            })

            useCase.registerMessageListener((turn: ChatTurnHistory, command: string) => {
                const currentState = uiStateRef.current
                if (currentState.type !== "loaded") return 

                const isCharMessage = 
                    turn.author.authorId === character.characterAiData.characterId
                
                const uiState =  currentState.data

                const newMessage: ChatListModel = {
                    turnId: turn.turnKey.turnId,
                    message: turn.candidates[0]?.rawContent,
                    author: turn.author,
                    authorAvatar: isCharMessage ? uiState.metadata.characterAvatar : "",
                    createTime: turn.createTime
                };
                
                const newList = uiState.chatList

                switch(command) {
                    case CommandType.ADD : {
                        newList.push(newMessage)
                        
                        uiState.chatList = newList
                        setChatRoomUiState(setLoaded(uiState))
                        break
                    }
                    case CommandType.UPDATE : {
                        const updateIndex = newList.findIndex(item => 
                            item.turnId === newMessage.turnId
                        )  
                        if (updateIndex > -1) newList[updateIndex] = newMessage

                        uiState.chatList = newList
                        setChatRoomUiState(setLoaded(uiState))
                        break
                    }
                }
            })

            useCase.openWebsocketConnection()
        }

        const fetchInitialData = async () => {
            const chatHistory = (chatData.chatId !== "") ? await useCase.loadChatHistory(chatData.chatId) : []
            if (chatHistory instanceof Error) {
                setChatRoomUiState(setError(chatHistory))
                return 
            }

            const chatList: ChatListModel[] = chatHistory.map(chat => {
                const isCharMessage = chat.author.authorId === character.characterAiData.characterId
                return {
                    turnId: chat.turnKey.turnId,
                    message: chat.candidates[0]?.rawContent,
                    author: chat.author,
                    authorAvatar: isCharMessage? chatData.characterAvatar : "",
                    createTime: chat.createTime
                }
            })

            if (chatList.length <= 0) 
                useCase.createChatRoom(character.characterAiData.characterId)

            setChatRoomUiState(setLoaded(
                {
                    metadata: chatData,
                    chatList: chatList.reverse()
                }
            ))    
        }

        openWebsocket()

        return () => {
            if (openChat) return 
            useCase.closeWebsocketConnection()
            setChatRoomUiState(setLoading())
        }
    }, [openChat])

    return chatRoomUiState
}