
export const PauseButton = ({ onClick }: { onClick: () => void }) => {
    return <>
        <button onClick={onClick}>
            <p>Pause</p>
        </button>
    </>
}