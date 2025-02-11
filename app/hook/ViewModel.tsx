import { ChatGptUseCase } from "@/domain/ChatGptUseCase";
import { createContext } from "react";

export const ViewModel = createContext(new ChatGptUseCase())