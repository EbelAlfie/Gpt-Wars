"use client"
import { useMemo } from "react";
import { ChatRoom } from "./components/ChatRoom";
import { ViewModel } from "../../_chatgpt/presentation/hook/ViewModel";
import { ChatGptUseCase } from "@/_chatgpt/domain/ChatGptUseCase";

export default function ChatPage() {
  const useCase = useMemo(() => new ChatGptUseCase(), []) 

  return (
    <ViewModel.Provider value={useCase}>
      <ChatRoom />
    </ViewModel.Provider>
  )
}
