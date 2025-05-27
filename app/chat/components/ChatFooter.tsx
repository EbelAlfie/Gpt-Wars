"use client"
import { ChangeEvent, useMemo, useState } from "react"
import { ChatInput } from "./ChatInput"
import { SendButton } from "./SendButton"

type ChatFooterProps = {
    className?: string,
    onSend: (text: string) => void
}

export const ChatBox = ({...props}: ChatFooterProps) => {
    const borderRadius = useMemo(() => "rounded-2xl", [])
    const [textValue, setTextValue] = useState<string>("")

    const onTextChanged = (changedEvent: ChangeEvent<HTMLInputElement>) => {
        const text = changedEvent.target.value ?? ""
        if (text === "") return

        setTextValue(text)
    }

    const onSendPressed = () => {
        if (textValue === "") return
        props.onSend(textValue)
    }

    return (
        <div className={`flex flex-col bg-slate-700 items-center border-2 border-slate-500 ${borderRadius} ${props.className}`}>
            <ChatInput 
                className={borderRadius}
                value={textValue}
                onTextChanged={onTextChanged}
            />
            <SendButton 
                className="self-end"
                onClick={onSendPressed}
            />
        </div>
    )
}