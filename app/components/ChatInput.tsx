"use client"

import { ChangeEvent, ChangeEventHandler, useState } from "react"

export const ChatInput = () => {
    const [textValue, setTextValue] = useState<string>("")

    const onTextChanged = (changedEvent: ChangeEvent<HTMLInputElement>) => {
        const text = changedEvent.target.textContent ?? ""
        if (text === "") return

        setTextValue(text)
    }

    return (
        <input
            value={textValue}
            onChange={onTextChanged}
        /> 
    )
}