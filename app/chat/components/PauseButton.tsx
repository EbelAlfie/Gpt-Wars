type PauseButtonProps = { 
    paused: boolean,
    onClick: (state: boolean) => void
}

export const PauseButton = ({ paused, onClick }: PauseButtonProps) => {
    return <button 
        className="p-2 rounded-full border-2 border-slate-600 bg-yellow-100 flex-shrink" 
        onClick={() => onClick(paused)}
    >
        <img 
            className="size-10"
            src={paused ? "./pause.png" : "./play.svg"}
        />
    </button>
}