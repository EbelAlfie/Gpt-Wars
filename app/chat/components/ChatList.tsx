import { useMemo } from "react"
import { ChatListState, ChatRoomUiState } from "../_model/ChatRoomUiState"
import { ChatBubble, ModeratorBubble } from "./ChatBubble"

export type ChatState = Close | Open 

type Close = { type: "close" }
type Open = { 
    type: "open", 
    modMessage: string,
}

type ChatListProps = { 
    modMessage: string,
    chatState: ChatRoomUiState
}

export const ChatListScreen = ({state, listState}: { state: ChatState, listState: ChatRoomUiState }) => {
    const animation = useMemo(() => state.type === "open" ? "show-chat" : "hide-chat", [state])
    return <div className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 transition-all ${animation}`}>
        {state.type === "open" &&
            <ChatList
                modMessage={state.modMessage}
                chatState={listState}
            />
        }
    </div>
}

export const ChatList = ({...props}: ChatListProps) => {
    switch(props.chatState.type) {
        case "loaded": {
            const chatBubbles = props.chatState.data.chatList.map(chat => 
                <ChatBubble 
                    key={chat.turnId} 
                    message={chat}
                />
            )
            return <>
                <div className="flex flex-col rounded-xl border border-white p-8 bg-slate-800">
                    <ModeratorBubble message={props.modMessage}/>
                    <ul className="flex flex-col gap-3 w-full flex-grow mt-5">
                        {chatBubbles}
                    </ul>
                </div>
            </>  
        }
        case "error": {}
        default:
    }
}