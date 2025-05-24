import { Message } from "../_model/Message"
import { ChatBubble } from "./ChatBubble"

type ChatListProps = { 
    chats: Message[]
}

export const ChatList = ({...props}: ChatListProps) => { 
    const chatBubbles = props.chats.map(chat => 
        <ChatBubble key={chat.id} text={chat.content}/>
    )
    return <>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-xl border border-white p-8 bg-slate-800">
            <ul className="w-full flex-grow">
                {chatBubbles}
            </ul>
        </div>
    </>
}