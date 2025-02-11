type ButtonProps = {
    onClick : () => void
 }

export const SendButton = ({...props}: ButtonProps) => {
    return (
        <button 
            className="p-5 bg-white rounded-lg"
            onClick={props.onClick}
        >
            Send
        </button>
    )
}