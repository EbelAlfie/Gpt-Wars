
type ChatBubbleProps = {
    text: string
}

export const ChatBubble = (props: ChatBubbleProps) => {
    return <>
        <li className="max-w-lg p-3">
            <p>${props.text}</p>
        </li>
    </>
}

export const ModeratorBubble = ({message}: {message: string}) => {
    return <div>
        <p>{message}</p>
    </div>
}