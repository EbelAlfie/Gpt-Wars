import { useMemo, useState } from "react"
import { Message } from "../_model/Message"
import { ChatList } from "./ChatList"
import { usePlayer } from "@/app/hooks/usePlayer"
import { useSearchParams } from "next/navigation"
import { VsAvatar } from "./VsAvatar"
import { ChatTrigger } from "./ChatTrigger"

export const ChatRoom = () => {
    const playersId = useSearchParams()

    const p1 = useMemo(() => playersId.get("p1"), [])
    const p2 = useMemo(() => playersId.get("p2"), [])
    
    const players = usePlayer(p1, p2)

    const [chatList, setChatList] = useState<Message[]>([])
    const [inputVisible, setInputVisibility] = useState(true)    

    const onSend = (text: string) => {
    }
    
    return <>
        <main className="h-full w-full flex flex-col">
            <ChatList
                chats={chatList}
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
                onSend = {onSend}
            /> 
        </main>
    </>    
}