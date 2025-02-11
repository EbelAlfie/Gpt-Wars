import { ChangeEvent } from "react"

type ChatInputProps = {
    value: string,
    onTextChanged: (event: ChangeEvent<HTMLInputElement>) => void
}

export const ChatInput = ({...props}: ChatInputProps) => {
    return (
        <input
            value={props.value}
            onChange={props.onTextChanged}
        /> 
    )
}