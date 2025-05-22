import { ChangeEvent } from "react"

type ChatInputProps = {
    className?: string,
    value: string,
    onTextChanged: (event: ChangeEvent<HTMLInputElement>) => void
}

export const ChatInput = ({...props}: ChatInputProps) => {
    return (
        <input
            className={`w-full flex-grow p-3 text-gray-300 bg-slate-700 focus:outline-none ${props.className}`}
            value={props.value}
            placeholder="Ask your question"
            onChange={props.onTextChanged}
        /> 
    )
}