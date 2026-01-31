import { CharacterItemModel } from "@/_characterai/_domain/response_model/CharacterItemModel"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

export const useCharacterId = () => {
    const playersId = useSearchParams()
    
    const p1 = useMemo(() => playersId.get("p1") ?? "", [])
    const p2 = useMemo(() => playersId.get("p2") ?? "", [])

    return {p1, p2}
}

export const createCharacterParam = (
    firstPlayer: CharacterItemModel,
    secondPlayer: CharacterItemModel
) => { 
    return new URLSearchParams({
        p1: firstPlayer.externalId,
        p2: secondPlayer.externalId
    })
}