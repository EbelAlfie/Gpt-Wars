import { ViewModel } from "@/_chatgpt/presentation/hook/ViewModel"
import { Failed, Loaded, Loading, setError, setLoaded, setLoading } from "@/app/common/UiState"
import { useContext, useEffect, useState } from "react"
import { CharacterModel } from "../_domain/response_model/CharacterModel"

export type CharacterState = Loading | Loaded<CharacterModel[]> | Failed

export const useCharacter = () => {
    const useCase = useContext(ViewModel)
    const [charState, setCharState] = useState<CharacterState>(setLoading())

    useEffect(() => {
        const fetchCharacter = async () => {
            const characters = await useCase.discoverCharacter()
            if (characters instanceof Error) {
                setCharState(setError(characters))
                return 
            }
            setCharState(setLoaded(characters))
        }

        fetchCharacter()
    },[useCase] )

    return charState
}