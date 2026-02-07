import { useMemo } from "react"
import { ChatBox } from "./ChatFooter"
import { useTheme } from "@/app/hooks/useTheme"

export const ChatTrigger = ({
    visible, onSend
}:{ 
    visible: boolean, 
    onSend: (msg: string) => void,
}) => {
    const theme = useTheme()
    const inputVisibility = useMemo(() => visible ? "show-input": "hide-input", [visible])

    return <>
        <div className={`absolute top-1/4 flex flex-col p-5 w-full h-fit items-center transition-all ${inputVisibility}`}>
            <h1 className={`text-4xl text-center mb-8 ${theme.debateStyle}`}>Trigger Debate</h1>
            <ChatBox 
                className="w-[75vw] lg:w-[50%]"
                onSend={onSend}
            />
        </div>
    </>
}