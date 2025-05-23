import { useMemo, useState } from "react"
import { ChatBox } from "./ChatFooter"
import { Message } from "../_model/Message"
import { ChatList } from "./ChatList"
import { usePlayer } from "@/app/hooks/usePlayer"
import { useSearchParams } from "next/navigation"

export const ChatRoom = () => {
    const playersId = useSearchParams()

    const p1 = useMemo(() => playersId.get("p1"), [])
    const p2 = useMemo(() => playersId.get("p2"), [])
    
    const players = usePlayer(p1, p2)
    const [chatList, setChatList] = useState<Message[]>([])

    const [topic, setTopic] = useState("")
    const inputVisibility = useMemo(() => topic === "" ? "show-input": "hide-input", [topic])

    const onSend = (text: string) => {
        // const lastChat = chatList.pop()
        // sendChat(useCase, text, lastChat, (state) => {
        //     if (state instanceof Error) {
        //         return 
        //     }

        //     const message: Message = {
        //         id: state.id,
        //         content: state.content.parts[0],
        //         author: state.author.role
        //     }

        //     const newList = chatList
        //     const exitingMessage = newList.findIndex(message => {
        //         message.id === state.id
        //     })

        //     if (exitingMessage === -1) newList.push(message)
        //     else newList[exitingMessage] = message
        //     setChatList(newList)
        // })
    }
    
    return <>
        <main className="flex flex-col justify-center items-center h-full w-full">
            {/* <ChatList
                chats={chatList}
            /> */}
            {players.type === "loaded" && players.data.length > 2 && <>
                <img 
                    className="flex-grow"
                    src={players.data[0].avatarFileName}
                />
                <img 
                    className="flex-grow"
                    src={players.data[1].avatarFileName}
                />
            </>}
            <div className={`absolute flex flex-col p-5 w-full h-fit items-center transition-all ${inputVisibility}`}>
                <h1 className="text-4xl mb-8">Trigger Debate</h1>
                <ChatBox 
                    className="w-[50%] max-w-[50%]"
                    onSend={onSend}
                />
            </div>
        </main>
    </>    
}