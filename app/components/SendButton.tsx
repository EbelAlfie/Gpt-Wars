type ButtonProps = {
    onClick : () => void
 }

export const SendButton = ({...props}: ButtonProps) => {
    return (
        <button 
            className="m-3 py-2 px-5 bg-white rounded-lg text-blue-700"
            onClick={props.onClick}
        >
            Send
        </button>
    )
}