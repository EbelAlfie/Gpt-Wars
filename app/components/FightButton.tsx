import { useTheme } from "../hooks/useTheme"

export const FightButton = ({ onClick }: { onClick: () => void }) => {
    const theme = useTheme()
    return <>
        <button 
            className={`my-5 ${theme.startStyle}`}
            onClick={onClick}
        >
            Fight!
        </button>
    </>
}