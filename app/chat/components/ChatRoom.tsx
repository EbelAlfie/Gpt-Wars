import { useContext, useMemo, useState } from "react"
import { sendChat } from "../../../_chatgpt/presentation/hook/useChat"
import { ViewModel } from "../../../_chatgpt/presentation/hook/ViewModel"
import { ChatBox } from "./ChatFooter"
import { Message } from "../_model/Message"
import { ChatList } from "./ChatList"

export const ChatRoom = () => {
    const useCase = useContext(ViewModel)
    
    const [chatList, setChatList] = useState<Message[]>([])

    const [topic, setTopic] = useState("")

    const inputVisibility = useMemo(() => topic === "" ? "opacity-100": "opacity-0", [topic])

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
            setChatList(newList)
        })
    }
    
    return <>
        <main className="flex flex-col justify-center items-center h-full w-full">
            <ChatList
                chats={chatList}
            />
            <div className={`flex flex-col w-full h-fit items-center ${inputVisibility}`}>
                <h1 className="text-4xl mb-8">Trigger The Debate</h1>
                <ChatBox 
                    className="w-[50%] max-w-[50%]"
                    onSend={onSend}
                />
            </div>
        </main>
    </>    
}