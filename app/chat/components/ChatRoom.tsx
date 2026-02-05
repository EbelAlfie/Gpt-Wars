import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { ChatListScreen, ChatState, ErrorChatList } from "./ChatList"
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
    const paused = useRef(isPaused)
    
    const players = usePlayer(p1, p2)
    
    const {chatState, reconnect} = useChat(
        players,
        (chat) => sendMessage(chat.message, chat.author.authorId === p1 ? p2 : p1)
    )

    const sendMessage = async (text: string, recipientId: string|null) => {
        if (players.type !== "loaded" || !recipientId || recipientId === "") return 

        lastState.current = {
            text: text,
            recipientId: recipientId
        }

        if (paused.current) return 

        const model = players.data.get(recipientId)
        if (!model) return 

        useCase.sendMessage(model.recentChat.chatId, recipientId, text)
    }

    useEffect(() => {
        paused.current = isPaused
        if (isPaused) return 
        const state = lastState.current
        sendMessage(state?.text, state?.recipientId)
    }, [isPaused])
    
    return <>
        <ChatAction value={{
            isPaused: isPaused,
            setPaused: (pause: boolean) => setPause(!pause)
        }}>
            <main className="relative h-full w-full flex flex-col overflow-hidden">
                <VsBackground state={players}/>
                { chatViewState.type === "open" ? 
                    <>
                        <ChatListScreen 
                            state={chatViewState}
                            listState={chatState}
                        />
                        
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
                    </> :
                      <ErrorChatList onRefresh={reconnect}></ErrorChatList>
                }
            </main>
        </ChatAction>
    </>    
}