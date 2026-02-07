import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PlayersState } from "./usePlayer";
import { UseCase } from "./usecaseContext";
import { ChatTurnHistory } from "@/_characterai/_domain/response_model/ChatTurnHistory";
import { ChatListModel, ChatRoomUiState } from "../chat/_model/ChatRoomUiState";
import { setError, setLoaded, setLoading } from "../common/UiState";
import { CommandType } from "@/_characterai/common/Const";

export const useChat = (
    playerState: PlayersState,
    onFinalMessage: (chat: ChatListModel) => void
) => {
    const useCase = useContext(UseCase)
    const [chatListState, updateState] = useState<ChatRoomUiState>(setLoading())

    const connect = useCallback(() => {
        updateState(setLoading())
        useCase.openWebsocketConnection()
    }, [])

    const uiStateRef = useRef(chatListState) //TODO optimize ? 
    useEffect(() => {uiStateRef.current = chatListState},[chatListState])

    useEffect(() => {
        if (playerState.type !== "loaded") return 

        useCase.registerOpenListener(() => {
            console.log("Success open ws")
            updateState(setLoaded({chatList: []}))
        })

        useCase.registerErrorListener((message: Event) => {
            console.log("Error open ws" + message)
            updateState(setError(Error(JSON.stringify(message))))
        })

        useCase.registerMessageListener((turn: ChatTurnHistory, command: string) => {
            const currentState = uiStateRef.current
            if (currentState.type !== "loaded") return 
            if (turn.author.isHuman) return 

            const uiState =  currentState.data

            const newMessage: ChatListModel = {
                turnId: turn.turnKey.turnId,
                message: turn.candidates[0]?.rawContent,
                author: turn.author,
                authorAvatar: "",
                createTime: turn.createTime
            };

            const newList = uiState.chatList
            let currentPosition = 0

            switch(command) {
                case CommandType.ADD : {
                    currentPosition = newList.push(newMessage)
                    
                    uiState.chatList = newList
                    updateState(setLoaded(uiState))
                    break
                }
                case CommandType.UPDATE : {
                    const updateIndex = newList.findIndex(item => 
                        item.turnId === newMessage.turnId
                    )  

                    if (updateIndex > -1) {
                        currentPosition = updateIndex
                        newList[updateIndex] = newMessage
                    }

                    uiState.chatList = newList
                    updateState(setLoaded(uiState))
                    break
                }
            }

            console.log(turn)

            if (!turn || (turn.candidates && turn.candidates[0].isFinal)) 
                onFinalMessage(newList[currentPosition])
        })
        connect()
    }, [playerState])

    return {chatState: chatListState, reconnect: connect }
}