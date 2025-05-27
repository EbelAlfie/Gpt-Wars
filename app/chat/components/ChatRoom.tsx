import { useContext, useMemo, useState } from "react"
import { ChatListScreen, ChatState } from "./ChatList"
import { usePlayer } from "@/app/hooks/usePlayer"
import { useSearchParams } from "next/navigation"
import { VsBackground } from "./VsAvatar"
import { ChatTrigger } from "./ChatTrigger"
import { UseCase } from "@/app/hooks/usecaseContext"
import { useChat } from "@/app/hooks/useChat"

export const ChatRoom = () => {
    const useCase = useContext(UseCase)
    const playersId = useSearchParams()

    const p1 = useMemo(() => playersId.get("p1"), [])
    const p2 = useMemo(() => playersId.get("p2"), [])
    
    const [inputVisible, setInputVisibility] = useState(true)    
    const [chatViewState, setChatVisibility] = useState<ChatState>({ type: "close" })

    const sendMessage = async (text: string, recipientId: string|null) => {
        if (!recipientId || recipientId === "") return 

        const recentChat = await useCase.fetchRecentChat(recipientId)
        if (recentChat instanceof Error) {
            return 
        }
        
        useCase.sendMessage(recentChat.chatId, recipientId, text)
    }

    const players = usePlayer(p1, p2)

    const chatState = useChat(
        players,
        (chat) => sendMessage(chat.message, chat.author.authorId === p1 ? p2 : p1)
    )
    
    return <>
        <main className="h-full w-full flex flex-col">
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
    </>    
}