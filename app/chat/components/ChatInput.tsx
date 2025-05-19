import { ChangeEvent } from "react"

type ChatInputProps = {
    value: string,
    onTextChanged: (event: ChangeEvent<HTMLInputElement>) => void
}

export const ChatInput = ({...props}: ChatInputProps) => {
    return (
        <input
            className="flex-grow rounded-md p-2 m-3 text-black"
            value={props.value}
            onChange={props.onTextChanged}
        /> 
    )
}