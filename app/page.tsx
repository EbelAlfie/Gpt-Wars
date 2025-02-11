import { useMemo } from "react";
import { ChatRoom } from "./components/ChatRoom";
import { ViewModel } from "./hook/viewModel";

export default function ChatPage() {
  const useCase = useMemo(() => new ChatGptUseCase(), []) 

  return (
    <ViewModel.Provider value={useCase}>
      <ChatRoom />
    </ViewModel.Provider>
  )
}
