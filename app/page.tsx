"use client"

import { CharacterListScreen } from "./components/CharacterListScreen";
import { SearchBar } from "./components/SearchBar";
import { useMemo } from "react";
import { UseCase } from "./hooks/usecaseContext";
import { ChatUseCase } from "@/_characterai/_domain/ChatUseCase";
import "./globals.css";

export default function HomePage () {
    const useCase = useMemo(() => new ChatUseCase(), []) 

    return (
        <UseCase.Provider value = {useCase}>
            <main className="h-full w-full">
                <section className="w-full">
                    <SearchBar />
                </section>
                <section className="w-full">
                    <CharacterListScreen />
                </section>
            </main>
        </UseCase.Provider>
    )
}