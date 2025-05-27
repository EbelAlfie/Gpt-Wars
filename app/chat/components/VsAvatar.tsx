import { PlayersState } from "@/app/hooks/usePlayer"

export const VsBackground = ({state}: {state: PlayersState}) => {
    return <>
        {state.type === "loaded" && <div className="flex flex-row w-full">
                <VsAvatar 
                    className="player-one-mask"
                    src={state.data[0].avatarFileName}
                />
                <VsAvatar 
                    className="player-two-mask" 
                    src={state.data[1].avatarFileName}
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
        />
    </>
}