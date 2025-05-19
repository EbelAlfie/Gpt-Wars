import { ChatUseCase } from "@/_characterai/_domain/ChatUseCase";
import { ChatGptUseCase } from "@/_chatgpt/domain/ChatGptUseCase";
import { createContext } from "react";

export const ViewModel = createContext(new ChatUseCase())