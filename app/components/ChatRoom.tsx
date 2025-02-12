import { useContext, useEffect } from "react"
import { useChat } from "../hook/useChat"
import { ChatList } from "./ChatList"
import { ViewModel } from "../hook/ViewModel"

export const ChatRoom = () => {
    const useCase = useContext(ViewModel)

    useEffect(() => {
        useChat(useCase)
    }, [])
    
    return <>
        <div className="flex flex-col h-screen w-max max-w-lg">
            {/* <ChatList />
            <ChatFooter /> */}
        </div>
    </>    
}