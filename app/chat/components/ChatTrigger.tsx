import { useMemo } from "react"
import { ChatBox } from "./ChatFooter"

export const ChatTrigger = ({
    visible, onSend
}:{ 
    visible: boolean, 
    onSend: (msg: string) => void,
}) => {
    const inputVisibility = useMemo(() => visible ? "show-input": "hide-input", [visible])

    return <>
        <div className={`absolute top-1/4 flex flex-col p-5 w-full h-fit items-center transition-all ${inputVisibility}`}>
            <h1 className="text-4xl text-center mb-8">Trigger Debate</h1>
            <ChatBox 
                className="md:w-[50%] sm:w-fit"
                onSend={onSend}
            />
        </div>
    </>
}