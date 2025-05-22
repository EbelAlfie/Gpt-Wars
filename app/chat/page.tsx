"use client"
import { useMemo } from "react";
import { ChatRoom } from "./components/ChatRoom";
import { ViewModel } from "../../_chatgpt/presentation/hook/ViewModel";
import { ChatGptUseCase } from "@/_chatgpt/domain/ChatGptUseCase";

export default function ChatPage() {
  const players = useMemo(() => new window.URLSearchParams(window.location.href), [])

  const p1 = players.get("p1")
  const p2 = players.get("p2")
  const useCase = useMemo(() => new ChatGptUseCase(), []) 

  return (
    <ViewModel.Provider value={useCase}>
      <ChatRoom />
    </ViewModel.Provider>
  )
}
