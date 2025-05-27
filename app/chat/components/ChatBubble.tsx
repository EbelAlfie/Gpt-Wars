import { useSearchParams } from "next/navigation"
import { ChatListModel } from "../_model/ChatRoomUiState"
import { useMemo } from "react"

type ChatBubbleProps = {
    message: ChatListModel
}

export const ChatBubble = (props: ChatBubbleProps) => {
    const params = useSearchParams()
    const player1 = params.get("p1")
    const align = useMemo(() => props.message.author.authorId === player1 ? "self-start" : "self-end", [])
    return <>
        <li className={`max-w-md p-3 rounded-xl bg-slate-600 ${align}`}>
            <p>${props.message.message}</p>
        </li>
    </>
}

export const ModeratorBubble = ({message}: {message: string}) => {
    return <div className="rounded-full w-full p-2 bg-slate-600">
        <p className="text-center">{message}</p>
    </div>
}