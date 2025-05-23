"use client"
import { useMemo } from "react";
import { ChatUseCase } from "@/_characterai/_domain/ChatUseCase";
import { UseCase } from "../hooks/usecaseContext";
import { ChatRoom } from "./components/ChatRoom";
import "../globals.css";

export default function ChatPage() {
  const useCase = useMemo(() => new ChatUseCase(), []) 

  return (
    <UseCase.Provider value={useCase}>
      <ChatRoom />
    </UseCase.Provider>
  )
}
