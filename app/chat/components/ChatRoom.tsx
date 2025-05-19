import { useContext, useEffect, useState } from "react"
import { sendChat } from "../../../_chatgpt/presentation/hook/useChat"
import { ChatList } from "./ChatList"
import { ViewModel } from "../../../_chatgpt/presentation/hook/ViewModel"
import { ChatFooter } from "./ChatFooter"
import { Message } from "@/_chatgpt/domain/entity/MessageMapper"

export const ChatRoom = () => {
    const useCase = useContext(ViewModel)
    
    const [chatList, setChatList] = useState<Message[]>([])

    const onSend = (text: string) => {
        const lastChat = chatList.pop()
        sendChat(useCase, text, lastChat, (state) => {
            if (state instanceof Error) {
                return 
            }

            const message: Message = {
                id: state.id,
                content: state.content.parts[0],
                author: state.author.role
            }

            const newList = chatList
            const exitingMessage = newList.findIndex(message => {
                message.id === state.id
            })

            if (exitingMessage === -1) newList.push(message)
            else newList[exitingMessage] = message
            
            console.log("aushduaisdaisd")
            console.log(message)
            setChatList(newList)
        })
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