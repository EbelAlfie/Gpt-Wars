"use client"

import { CharacterListScreen } from "./components/CharacterListScreen";
import { SearchBar } from "./components/SearchBar";
import { useCallback, useMemo, useState } from "react";
import { UseCase } from "./hooks/usecaseContext";
import { ChatUseCase } from "@/_characterai/_domain/ChatUseCase";
import { FightButton } from "./components/FightButton";
import "./globals.css";
import { CharacterItemModel } from "@/_characterai/_domain/response_model/CharacterItemModel";
import { SelectedPlayer } from "./hooks/playerContext";
import { PlayerBanner } from "./components/PlayerBanner";
import { PlayerStyle } from "@/common/Constants";
import { useTheme } from "./hooks/useTheme";
import { useRouter } from "next/navigation";
import { createCharacterParam } from "./hooks/useCharacterId";

export default function HomePage () {
    const useCase = useMemo(() => new ChatUseCase(), []) 
    const theme = useTheme()
    const router = useRouter()
    const [querytext, setText] = useState("")

    const [selectedCharData, setSelectedCharData] = useState<CharacterItemModel[]>([])
    const onFightClicked = useCallback(() => {
        const characters = selectedCharData
        if (characters.length < 2) return //TODO

        const firstPlay = selectedCharData[PlayerStyle.ONE]
        const secondPlay = selectedCharData[PlayerStyle.TWO]

        const params = createCharacterParam(firstPlay, secondPlay)
        router.push(`/chat?${params.toString()}`)
    }, [selectedCharData])

    const bannerStyle = useMemo(() => "w-1/5 flex-shrink-0", [])

    return (
        <UseCase.Provider value = {useCase}>
            <SelectedPlayer.Provider value= {
                {
                    selectedPlayer: selectedCharData,
                    setSelectedPlayer: setSelectedCharData
                }   
            }>
                <main className="h-screen w-screen flex flex-row justify-center items-center py-2">
                    <section className={bannerStyle}>
                        <PlayerBanner model={selectedCharData[PlayerStyle.ONE]} />
                    </section>
                    <section className="w-3/5 flex-1 h-screen flex flex-col">
                        <h1 className={`self-center mt-2 ${theme.headerStyle}`}>Player Select</h1>
                        <CharacterListScreen 
                            querytext={querytext} 
                            setQueryText={setText} 
                            onFightClicked={onFightClicked}
                        />
                    </section>
                    <section className={bannerStyle} >
                        <PlayerBanner model={selectedCharData[PlayerStyle.TWO]} />
                    </section>
                </main>
            </SelectedPlayer.Provider>
        </UseCase.Provider>
    )
}