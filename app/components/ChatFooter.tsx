"use client"
import { ChangeEvent, useState } from "react"
import { ChatInput } from "./ChatInput"
import { SendButton } from "./SendButton"

type ChatFooterProps = {
    onSend: (text: string) => void
}

export const ChatFooter = ({...props}: ChatFooterProps) => {
    const [textValue, setTextValue] = useState<string>("")

    const onTextChanged = (changedEvent: ChangeEvent<HTMLInputElement>) => {
        const text = changedEvent.target.textContent ?? ""
        if (text === "") return

        setTextValue(text)
    }

    const onSendPressed = () => {

    }

    return (
        <div className="flex flex-row bg-blue-950 justify-between items-center">
            <ChatInput 
                value={textValue}
                onTextChanged={onTextChanged}
            />
            <SendButton 
                onClick={onSendPressed}
            />
        </div>
    )
}