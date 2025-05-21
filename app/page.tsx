"use client"

import { CharacterListScreen } from "./components/CharacterListScreen";
import { SearchBar } from "./components/SearchBar";
import { useCallback, useMemo, useState } from "react";
import { UseCase } from "./hooks/usecaseContext";
import { ChatUseCase } from "@/_characterai/_domain/ChatUseCase";
import { FightButton } from "./components/FightButton";
import "./globals.css";

export default function HomePage () {
    const useCase = useMemo(() => new ChatUseCase(), []) 
    const [querytext, setText] = useState("")

    const onFightClicked = useCallback(() => {}, [])

    return (
        <UseCase.Provider value = {useCase}>
            <main className="h-full w-full">
                <section className="w-full flex flex-row items-center">
                    <SearchBar className="self-center" query={querytext} onTextChanged={setText}/>
                </section>
                <section>
                    <CharacterListScreen />
                </section>
                <section className="p-2">
                    <FightButton onClick={onFightClicked}/>
                </section>
            </main>
        </UseCase.Provider>
    )
}