import { createContext, useContext } from "react";

export type PlayerTheme = {
    content: string,
    text: string,
    border: string
}

class Theme { 
    headerStyle = "neon-text text-5xl text-center font-[street-fight]"
    searchBarStyle = "rounded-lg border-pink-600 bg-blue-950 placeholder-blue-400"
    playerOneStyle = {
        content: "1P",
        text: "text-sky-300",
        border: "border-2 border-sky-300 animate-pulse-scale"
    }
    playerTwoStyle = {
        content: "2P",
        text: "text-red-300",
        border: "border-2 border-red-300 animate-pulse-scale"
    }
    startStyle = "animate-blink font-bold text-lg transition-transform text-center rounded-lg hover:scale-150"
}

const ThemeProvider = createContext(new Theme())

export const useTheme = (): Theme => { 
    return useContext(ThemeProvider)
}