export const FightButton = ({ onClick }: { onClick: () => void }) => {
    return <>
        <button 
            className="my-5 rounded-lg hover:scale-150 transition-transform text-center"
            onClick={onClick}
        >
            Fight!
        </button>
    </>
}