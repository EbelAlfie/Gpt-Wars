"use client"
import { useMemo } from "react";
import { ChatRoom } from "./components/ChatRoom";
import { ViewModel } from "./hook/ViewModel";
import { ChatGptUseCase } from "@/domain/chatgpt/ChatGptUseCase";

export default function ChatPage() {
  const useCase = useMemo(() => new ChatGptUseCase(), []) 

  return (
    <ViewModel.Provider value={useCase}>
      <ChatRoom />
    </ViewModel.Provider>
  )
}
