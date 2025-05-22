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
        <ul className="w-screen flex-grow">
            {chatBubbles}
        </ul>
    </>
}