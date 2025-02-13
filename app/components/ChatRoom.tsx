import { useContext, useEffect, useState } from "react"
import { sendChat } from "../hook/useChat"
import { ChatList } from "./ChatList"
import { ViewModel } from "../hook/ViewModel"
import { ChatFooter } from "./ChatFooter"
import { Message } from "@/domain/entity/Message"

export const ChatRoom = () => {
    const useCase = useContext(ViewModel)
    
    const [chatList, setChatList] = useState<Message[]>([])

    const onSend = (text: string) => {
        sendChat(useCase, text, chatList.pop())
    }
    
    return <>
        <div className="flex flex-col h-screen w-max max-w-lg">
            <ChatList 
                chats={chatList}
            />
            <ChatFooter 
                onSend={onSend}
            />
        </div>
    </>    
}