import { Failed, Loaded, Loading, setError, setLoaded, setLoading } from "@/app/common/UiState"
import { useContext, useEffect, useState } from "react"
import { CharacterItemModel } from "../_domain/response_model/CharacterItemModel"
import { UseCase } from "@/app/hooks/usecaseContext"

export type CharacterState = Loading | Loaded<CharacterItemModel[]> | Failed

export const useCharacter = () => {
    const useCase = useContext(UseCase)
    const [charState, setCharState] = useState<CharacterState>(setLoading())

    useEffect(() => {
        const fetchCharacter = async () => {
            setCharState(setLoading())
            const characters = await useCase.discoverCharacter()
            if (characters instanceof Error) {
                setCharState(setError(characters))
                return 
            }
            setCharState(setLoaded(characters))
        }

        fetchCharacter()
    }, [useCase] )

    return charState
}