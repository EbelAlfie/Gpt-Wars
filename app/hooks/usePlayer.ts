import { useContext, useEffect, useState } from "react"
import { Failed, Loaded, Loading, setError, setLoaded, setLoading } from "../common/UiState"
import { UseCase } from "./usecaseContext"
import { Player } from "../chat/_model/Player"

export type PlayersState = Loading | Loaded<Map<string, Player>> | Failed 

export const usePlayer = (player1: string| null, player2: string| null) => {
    const useCase = useContext(UseCase)

    const [players, setPlayers] = useState<PlayersState>(setLoading())

    useEffect(() => {
        if (player1 === null || player2 == null) {
            setPlayers(setError(Error("No Character ID")))
            return 
        }

        setPlayers(setLoading())

        const loadPlayers = async () => {

            // const resurect = await useCase.resurectCharacter(player1)
            // if (resurect instanceof Error) {
            //     setPlayers(setError(resurect))
            //     return 
            // }
            // const resurect2 = await useCase.resurectCharacter(player2)
            // if (resurect2 instanceof Error) {
            //     setPlayers(setError(resurect2))
            //     return 
            // }

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

            const recentChatP1 = await useCase.fetchRecentChat(player1)
            if (recentChatP1 instanceof Error) {
                setPlayers(setError(recentChatP1))
                return 
            }

            const recentChatP2 = await useCase.fetchRecentChat(player2)
            if (recentChatP2 instanceof Error) {
                setPlayers(setError(recentChatP2))
                return 
            }

            const player1Model = {
                recentChat: recentChatP1,
                model: firstPlayer
            }

            const player2Model = {
                recentChat: recentChatP2,
                model: secPlayer
            }

            const map = new Map()
            map.set(player1, player1Model)
            map.set(player2, player2Model)

            setPlayers(setLoaded(map))
        }

        loadPlayers()
    }, [player1, player2])

    return players
}