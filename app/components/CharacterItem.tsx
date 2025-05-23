import { CharacterItemModel } from "@/_characterai/_domain/response_model/CharacterItemModel"
import { useMemo } from "react"

type CharacterItemProp = { 
    character: CharacterItemModel, 
    selected: boolean,
    onSelected: () => void 
}

export const CharacterItem = ({ character, selected = false, onSelected }: CharacterItemProp) => {
    const style = useMemo(() => selected ? "border-2 border-sky-300": "", [selected])
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