import { ChatBubble } from "./ChatBubble"

type ChatListProps = { 
    chats: string[]
}

export const ChatList = ({...props}: ChatListProps) => { 
    const chatBubbles = props.chats.map(chat => <ChatBubble text={chat}/>)
    return <>
        <ul className="flex-grow">
            {chatBubbles}
        </ul>
    </>
}