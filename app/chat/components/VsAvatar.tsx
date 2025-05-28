import { useCharacterId } from "@/app/hooks/useCharacterId"
import { PlayersState } from "@/app/hooks/usePlayer"

export const VsBackground = ({state}: {state: PlayersState}) => {
    const {p1, p2} = useCharacterId()
    return <>
        {state.type === "loaded" && <div className="flex flex-row w-full overflow-hidden pointer-events-none">
                <VsAvatar 
                    className="player-one-mask"
                    src={state.data.get(p1)?.model?.avatarFileName ?? ""}
                />
                <VsAvatar 
                    className="player-two-mask" 
                    src={state.data.get(p2)?.model?.avatarFileName ?? ""}
                />
            </div>
        }
    </>
}

const VsAvatar = ({src, className}: {src: string, className?: string}) => {
    return <>
        <img 
            className={`size-11/12 flex-grow ${className}`}
            src={src}
            style={
                {
                    userSelect: "none"
                }
            }
        />
    </>
}