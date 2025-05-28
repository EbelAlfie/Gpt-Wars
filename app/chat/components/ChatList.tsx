import { useEffect, useMemo, useRef } from "react"
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
    const animation = useMemo(() => state.type === "open" ? "show-chat" : "show-chat", [state])
    return <div className={`absolute left-1/4 w-1/2 h-screen max-h-screen transition-all show-chat ${animation}`}>
        {state.type === "open" &&
            <ChatListContent
                modMessage={state.modMessage}
                chatState={listState}
            />
        }
    </div>
}

const ChatListContent = ({...props}: ChatListProps) => {
    switch(props.chatState.type) {
        case "loaded": {
            return <ChatList 
                modMessage={props.modMessage}
                state={props.chatState.data}
            />
        }
        case "error": {}
        default:
    }
}

const ChatList = ({...props}: {modMessage: string, state: ChatListState}) => {
    const chatBubbles = props.state.chatList.map(chat => 
        <ChatBubble 
            key={chat.turnId} 
            message={chat}
        />
    )

    const listRef = useRef<HTMLUListElement>(null!)

    useEffect(() => {
        const ref = listRef.current
        if (!ref) return 

        ref.scrollIntoView()
    }, [chatBubbles])

    return <>
        <div className="z-10 w-full h-full flex flex-col rounded-xl border border-white p-8 bg-slate-800">
            <ModeratorBubble message={props.modMessage}/>
            <ul 
                className="flex flex-col max-h-1/3 h-1/3 gap-3 w-full flex-grow mt-5 overflow-y-auto"
                ref={listRef}
            >
                {chatBubbles}
            </ul>
        </div>
    </> 
}