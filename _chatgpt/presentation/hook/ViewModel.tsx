import { ChatGptUseCase } from "@/_chatgpt/domain/ChatGptUseCase";
import { createContext } from "react";

export const ViewModel = createContext(new ChatGptUseCase())