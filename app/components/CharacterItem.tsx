import { CharacterItemModel } from "@/_characterai/_domain/response_model/CharacterItemModel"
import { PlayerStyle } from "@/common/Constants"
import { useMemo } from "react"
import { PlayerTheme, useTheme } from "../hooks/useTheme"

type CharacterItemProp = { 
    character: CharacterItemModel, 
    selected: number| undefined,
    onSelected: () => void 
}

export const CharacterItem = ({ character, selected, onSelected }: CharacterItemProp) => {
    const theme = useTheme()
    const style = useMemo<PlayerTheme|null>(() => {
        switch(selected) {
            case PlayerStyle.ONE: 
                return theme.playerOneStyle
            case PlayerStyle.TWO:
                return theme.playerTwoStyle
            default: 
                return null
        }
    }
    , [selected])

    console.log(`vis ${style?.content} ${selected}`)

    return <>
        <li className={`relative flex flex-col w-full h-full rounded-lg bg-slate-600 items-center hover:cursor-pointer`} 
            onClick={onSelected}
        >
            <span className={`absolute pointer-events-none inset-0 rounded-lg z-10 ${style?.border}`}>
                {style && 
                    <p className={`absolute -top-7 left-1/2 -translate-x-1/2 pt-0.5 px-0.5 ${style.text}`}>
                        {style?.content}
                    </p>
                }
            </span>
            <img 
                className="w-full aspect-square rounded-tl-lg rounded-tr-lg"
                src={character.avatarFileName}
            />
            <p className={`${theme.playerName} text-xs text-ellipsis line-clamp-1 overflow-x-hidden m-2 text-white`}>{character.name}</p>
        </li>
    </>
}