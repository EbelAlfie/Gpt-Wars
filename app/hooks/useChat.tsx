import { ChatUseCase } from "@/_characterai/_domain/ChatUseCase";
import { useContext, useEffect, useRef, useState } from "react";
import { PlayersState } from "./usePlayer";
import { UseCase } from "./usecaseContext";
import { ChatTurnHistory } from "@/_characterai/_domain/response_model/ChatTurnHistory";
import { ChatListModel, ChatRoomUiState } from "../chat/_model/ChatRoomUiState";
import { setError, setLoaded, setLoading } from "../common/UiState";
import { CommandType } from "@/_characterai/common/Const";

export const useChat = (playerState: PlayersState) => {
    const useCase = useContext(UseCase)

    const [chatListState, updateState] = useState<ChatRoomUiState>(setLoading())

    const uiStateRef = useRef(chatListState) //TODO optimize ? 
    useEffect(() => {uiStateRef.current = chatListState},[chatListState])

    useEffect(() => {
        if (playerState.type !== "loaded") return 
        updateState(setLoading())

        useCase.registerOpenListener(() => {
            // updateState(setLoaded()) TODO
        })

        useCase.registerErrorListener((message: Event) => {
            updateState(setError(Error(JSON.stringify(message))))
        })

        useCase.registerMessageListener((turn: ChatTurnHistory, command: string) => {
            const currentState = uiStateRef.current
            if (currentState.type !== "loaded") return 

            const isCharMessage = 
                turn.author.authorId === talkingId
            
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
                    updateState(setLoaded(uiState))
                    break
                }
                case CommandType.UPDATE : {
                    const updateIndex = newList.findIndex(item => 
                        item.turnId === newMessage.turnId
                    )  
                    if (updateIndex > -1) newList[updateIndex] = newMessage

                    uiState.chatList = newList
                    updateState(setLoaded(uiState))
                    break
                }
            }
        })

        useCase.openWebsocketConnection()
    }, [playerState])

    return chatListState
}
