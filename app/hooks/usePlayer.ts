import { useContext, useEffect, useState } from "react"
import { Failed, Loaded, Loading, setError, setLoaded, setLoading } from "../common/UiState"
import { CharacterModel } from "@/_characterai/_domain/response_model/CharacterModel"
import { UseCase } from "./usecaseContext"

export type PlayersState = Loading | Loaded<CharacterModel[]> | Failed 

export const usePlayer = (player1: string| null, player2: string| null) => {
    const useCase = useContext(UseCase)

    const [players, setPlayers] = useState<PlayersState>(setLoading())

    useEffect(() => {
        setPlayers(setLoading())
        const loadPlayers = async () => {
            if (player1 === null || player2 == null) {
                setPlayers(setError(Error("No Character ID")))
                return 
            }

            const firstPlayer = await useCase.getCharacterInfo(player1)
            if (firstPlayer instanceof Error) {
                setPlayers(setError(firstPlayer))
                return 
            }

            const secPlayer = await useCase.getCharacterInfo(player2)
            if (secPlayer instanceof Error) {
                setPlayers(setError(secPlayer))
                return 
            }

            setPlayers(setLoaded([firstPlayer, secPlayer]))
        }

        loadPlayers()
    }, [player1, player2])

    return players
}