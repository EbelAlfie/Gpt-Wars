type ButtonProps = {
    className?: string,
    onClick : () => void
 }

export const SendButton = ({...props}: ButtonProps) => {
    return (
        <button 
            className={`m-3 py-2 px-5 bg-white rounded-3xl text-blue-700 ${props.className}`}
            onClick={props.onClick}
        >
            Send
        </button>
    )
}