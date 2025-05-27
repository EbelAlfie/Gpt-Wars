import { useContext, useMemo, useState } from "react"
import { ChatListScreen, ChatState } from "./ChatList"
import { usePlayer } from "@/app/hooks/usePlayer"
import { useSearchParams } from "next/navigation"
import { VsBackground } from "./VsAvatar"
import { ChatTrigger } from "./ChatTrigger"
import { UseCase } from "@/app/hooks/usecaseContext"
import { useChat } from "@/app/hooks/useChat"

export const ChatRoom = () => {
    const chatRoomId = "9262542d-acac-479f-bd55-c98eaca67740"
    const useCase = useContext(UseCase)
    const playersId = useSearchParams()

    const p1 = useMemo(() => playersId.get("p1"), [])
    const p2 = useMemo(() => playersId.get("p2"), [])
    
    const players = usePlayer(p1, p2)

    const chatState = useChat(players)

    const [inputVisible, setInputVisibility] = useState(true)    
    const [chatViewState, setChatVisibility] = useState<ChatState>({ type: "close" })
    
    const onFirstMessageSend = async (text: string) => {
        if (!p1 || p1 === "" || !p2 || p2 === "") return 

        const recentChat = await useCase.fetchRecentChat(p1)
        if (recentChat instanceof Error) {
            return 
        }

        const recentChatP2 = await useCase.fetchRecentChat(p2)
        if (recentChatP2 instanceof Error) {
            return 
        }

        // useCase.sendMessage(chatRoomId, p1, text)
        setInputVisibility(false)
        setChatVisibility({ 
            type: "open",
            modMessage: text
        })
    }
    
    return <>
        <main className="h-full w-full flex flex-col">
            <ChatListScreen 
                state={chatViewState}
                listState={chatState}
            />
            
            <VsBackground state={players}/>
            
            <ChatTrigger
                visible = {inputVisible}
                onSend = {onFirstMessageSend}
            /> 
        </main>
    </>    
}