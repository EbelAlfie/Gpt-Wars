
type ChatBubbleProps = {
    text: string
}

export const ChatBubble = (props: ChatBubbleProps) => {
    return <>
        <p>${props.text}</p>
    </>
}