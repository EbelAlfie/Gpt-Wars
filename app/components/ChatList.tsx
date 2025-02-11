import { ChatBubble } from "./ChatBubble"

type ChatListProps = { 
    text: string[]
}

export const ChatList = ({...props}: ChatListProps) => { 
    const chatBubbles = props.text.map(chat => <ChatBubble text={chat}/>)
    return <>
        <ul className="flex-grow">
            {chatBubbles}
        </ul>
    </>
}