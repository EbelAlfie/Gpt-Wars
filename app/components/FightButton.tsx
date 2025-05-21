export const FightButton = ({ onClick }: { onClick: () => void }) => {
    return <>
        <button 
            className="p-2 m-5 rounded-lg hover:scale-150 transition-transform text-center"
            onClick={onClick}
        >
            Fight!
        </button>
    </>
}