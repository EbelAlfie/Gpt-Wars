import { useContext, useMemo, useState } from "react"
import { Message } from "../_model/Message"
import { ChatList, ChatListScreen } from "./ChatList"
import { usePlayer } from "@/app/hooks/usePlayer"
import { useSearchParams } from "next/navigation"
import { VsAvatar } from "./VsAvatar"
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
    
    const [inputVisible, setInputVisibility] = useState(true)    
    const [chatListVisible, setChatVisibility] = useState(false)
    
    const chatState = useChat(players)

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
        setChatVisibility(true)
    }
    
    return <>
        <main className="h-full w-full flex flex-col">
            <ChatListScreen 
                visible={chatListVisible}
                state={chatState}
            />
            
            {players.type === "loaded" && <div className="flex flex-row w-full">
                    <VsAvatar 
                        className="player-one-mask"
                        src={players.data[0].avatarFileName}
                    />
                    <VsAvatar 
                        className="player-two-mask" 
                        src={players.data[1].avatarFileName}
                    />
                </div>
            }
            
            <ChatTrigger
                visible = {inputVisible}
                onSend = {onFirstMessageSend}
            /> 
        </main>
    </>    
}