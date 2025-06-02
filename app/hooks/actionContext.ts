import { createContext } from "react";

type ChatState = {
    isPaused: boolean,
    setPaused: (arg: boolean) => void
}

export const ChatAction = createContext<ChatState>(null!)