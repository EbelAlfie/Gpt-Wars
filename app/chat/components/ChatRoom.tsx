import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { ChatListScreen, ChatState } from "./ChatList"
import { usePlayer } from "@/app/hooks/usePlayer"
import { VsBackground } from "./VsAvatar"
import { ChatTrigger } from "./ChatTrigger"
import { UseCase } from "@/app/hooks/usecaseContext"
import { useChat } from "@/app/hooks/useChat"
import { useCharacterId } from "@/app/hooks/useCharacterId"
import { ChatAction } from "@/app/hooks/actionContext"

export const ChatRoom = () => {
    const useCase = useContext(UseCase)
    const {p1, p2} = useCharacterId()
    
    const [isPaused, setPause] = useState(false)
    
    const [inputVisible, setInputVisibility] = useState(true)    
    const [chatViewState, setChatVisibility] = useState<ChatState>({ type: "close" })

    const lastState = useRef<{text: string, recipientId: string|null}>(null!)
    
    const players = usePlayer(p1, p2)
    
    const chatState = useChat(
        players,
        (chat) => sendMessage(chat.message, chat.author.authorId === p1 ? p2 : p1)
    )

    const sendMessage = useCallback(async (text: string, recipientId: string|null) => {
        console.log(players)
        if (players.type !== "loaded" || !recipientId || recipientId === "") return 

        lastState.current = {
            text: text,
            recipientId: recipientId
        }

        if (isPaused) return 

        console.log("send") 
        console.log(isPaused) 
        const model = players.data.get(recipientId)
        if (!model) return 

        useCase.sendMessage(model.recentChat.chatId, recipientId, text)
    }, [isPaused]) 

    useEffect(() => { //Resume
        if (!isPaused) return 
        console.log("Resume") 
        console.log(isPaused) 
        const state = lastState.current
        sendMessage(state?.text, state?.recipientId)
    }, [isPaused])
    
    return <>
        <ChatAction value={{
            isPaused: isPaused,
            setPaused: (paused: boolean) => setPause(!paused)
        }}>
            <main className="h-full w-full flex flex-col overflow-hidden">
                <ChatListScreen 
                    state={chatViewState}
                    listState={chatState}
                />
                
                <VsBackground state={players}/>
                
                <ChatTrigger
                    visible = {inputVisible}
                    onSend = {(text: string) => {
                        sendMessage(text, p1)
                        setInputVisibility(false)
                        setChatVisibility({ 
                            type: "open",
                            modMessage: text
                        })
                    }}
                /> 
            </main>
        </ChatAction>
    </>    
}