import { useMemo } from "react"
import { ChatListState, ChatRoomUiState } from "../_model/ChatRoomUiState"
import { ChatBubble, ModeratorBubble } from "./ChatBubble"

type ChatListProps = { 
    modMessage: string,
    chats: ChatListState
}

export const ChatListScreen = ({visible = false, state}: {visible: boolean, state: ChatRoomUiState}) => {
    const animation = useMemo(() => visible ? "show-chat" : "hide-chat", [visible])
    return <div className={`transition-all ${animation}`}>
        {state.type === "loaded" && 
            <ChatList
                modMessage={""}
                chats={state.data}
            />
        }
    </div>
}

export const ChatList = ({...props}: ChatListProps) => { 
    const chatBubbles = props.chats.chatList.map(chat => 
        <ChatBubble key={chat.turnId} text={chat.message}/>
    )
    return <>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-xl border border-white p-8 bg-slate-800">
            <ModeratorBubble message={props.modMessage}/>
            <ul className="w-full flex-grow">
                {chatBubbles}
            </ul>
        </div>
    </>
}