import { ChatUseCase } from "@/_characterai/_domain/ChatUseCase";
import { createContext } from "react";

export const UseCase = createContext(new ChatUseCase())