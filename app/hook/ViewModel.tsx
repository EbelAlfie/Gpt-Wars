import { ChatGptUseCase } from "@/domain/chatgpt/ChatGptUseCase";
import { createContext } from "react";

export const ViewModel = createContext(new ChatGptUseCase())