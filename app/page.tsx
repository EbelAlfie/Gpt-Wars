"use client"

import { ViewModel } from "@/_chatgpt/presentation/hook/ViewModel";
import { CharacterListScreen } from "./components/CharacterListScreen";
import { SearchBar } from "./components/SearchBar";
import { useMemo } from "react";
import { ChatGptUseCase } from "@/_chatgpt/domain/ChatGptUseCase";

export default function HomePage () {
    const useCase = useMemo(() => new ChatGptUseCase(), []) 

    return (
        <ViewModel.Provider value = {useCase}>
            <main className="h-full w-full">
                <section className="w-full">
                    <SearchBar />
                </section>
                <section className="w-full">
                    <CharacterListScreen />
                </section>
            </main>
        </ViewModel.Provider>
    )
}