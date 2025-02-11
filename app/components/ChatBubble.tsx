
type ChatBubbleProps = {
    text: string
}

export const ChatBubble = (props: ChatBubbleProps) => {
    return <>
        <li>
            <p>${props.text}</p>
        </li>
    </>
}