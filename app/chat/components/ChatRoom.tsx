import { useContext, useMemo, useState } from "react"
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

    const players = usePlayer(p1, p2)
    
    const chatState = useChat(
        players,
        (chat) => sendMessage(chat.message, chat.author.authorId === p1 ? p2 : p1)
    )

    const sendMessage = async (text: string, recipientId: string|null) => {
        if (isPaused) return 
        
        if (players.type !== "loaded" || !recipientId || recipientId === "") return 
        const model = players.data.get(recipientId)
        if (!model) return 

        useCase.sendMessage(model.recentChat.chatId, recipientId, text)
    }

    const pauseAction = useMemo(() => { return {
        isPaused: isPaused,
        setPaused: (paused: boolean) => setPause(!paused)
    }}, [])
    
    return <>
        <ChatAction value={pauseAction}>
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