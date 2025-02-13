import { useContext, useEffect, useState } from "react"
import { useChat } from "../hook/useChat"
import { ChatList } from "./ChatList"
import { ViewModel } from "../hook/ViewModel"
import { ChatFooter } from "./ChatFooter"

export const ChatRoom = () => {
    const useCase = useContext(ViewModel)
    
    const [chatList, setChatList] = useState<string[]>([""])

    useEffect(() => {
        useChat(useCase)
    }, [])

    const onSend = (text: string) => {
        // useCase.openConversation()
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