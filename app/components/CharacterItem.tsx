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
        <li className={`flex flex-col p-2 w-full aspect-square rounded-lg bg-slate-600 items-center hover:cursor-pointer ${style}`} 
            onClick={onSelected}
        >
            <img 
                className="w-full aspect-square"
                src={character.avatarFileName}
            />
            <p className="text-md text-ellipsis line-clamp-1 my-2 text-white">{character.name}</p>
        </li>
    </>
}