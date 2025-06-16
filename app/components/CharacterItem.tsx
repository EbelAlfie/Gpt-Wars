import { CharacterItemModel } from "@/_characterai/_domain/response_model/CharacterItemModel"
import { PlayerStyle } from "@/common/Constants"
import { useMemo } from "react"

type CharacterItemProp = { 
    character: CharacterItemModel, 
    selected: number| undefined,
    onSelected: () => void 
}

export const CharacterItem = ({ character, selected, onSelected }: CharacterItemProp) => {
    const player: PlayerStyle| undefined = useMemo(() => {
        switch(selected) {
            case 0: return PlayerStyle.ONE
            case 1: return PlayerStyle.TWO
            default:
                return undefined
        }
    }, [selected])
    
    const style = useMemo(() => {
        switch(player) {
            case PlayerStyle.ONE: 
                return "border-2 border-sky-300"
            case PlayerStyle.TWO:
                return "border-2 border-red-300"
            default: 
                return ""
        }
    }
    , [player])
    return <>
        <div className={`flex flex-col h-auto w-auto p-10 rounded-lg bg-slate-600 items-center hover:cursor-pointer ${style}`} 
            onClick={onSelected}
        >
            <img 
                className="m-5 size-40"
                src={character.avatarFileName}
            />
            <p className="text-lg my-2 text-white">{character.name}</p>
            <p className="text-sm my-2 text-white text-ellipsis line-clamp-4">{character.description}</p>
        </div>
    </>
}