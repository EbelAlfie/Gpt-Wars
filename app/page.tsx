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

export default function HomePage () {
    const useCase = useMemo(() => new ChatUseCase(), []) 
    const [querytext, setText] = useState("")

    const [selectedCharData, setSelectedCharData] = useState<CharacterItemModel[]>([])
    const onFightClicked = useCallback(() => {}, [])

    return (
        <UseCase.Provider value = {useCase}>
            <SelectedPlayer.Provider value= {
                {
                    selectedPlayer: selectedCharData,
                    setSelectedPlayer: setSelectedCharData
                }   
            }>
                <main className="h-screen w-screen flex flex-row justify-center items-center py-2">
                    <section>

                    </section>
                    <section className="w-fit h-screen flex flex-col">
                        <h1 className="self-center neon-text text-5xl font-[street-fight]">Character Select</h1>
                        <section className="flex flex-row justify-center self-center">
                            <SearchBar className="self-center" query={querytext} onTextChanged={setText}/>
                        </section>
                        <section className="h-1/3 max-h-screen max-w-screen flex-grow bg-slate-700 p-6 overflow-y-scroll">
                            <CharacterListScreen />
                        </section>
                        <section className="flex flex-row justify-center items-center max-w-full p-2">
                            <FightButton onClick={onFightClicked}/>
                        </section>
                    </section>
                    <section>

                    </section>
                </main>
            </SelectedPlayer.Provider>
        </UseCase.Provider>
    )
}