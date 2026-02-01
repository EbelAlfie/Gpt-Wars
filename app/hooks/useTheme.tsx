import { createContext, useContext } from "react";

export type PlayerTheme = {
    content: string,
    text: string,
    border: string
}

class Theme { 
    headerStyle = "retro-text text-4xl text-center font-[retro-font]"
    debateStyle = "font-[retro-font]"
    searchBarStyle = "rounded-lg border-pink-600 bg-blue-950 placeholder-blue-400"
    playerOneStyle = {
        content: "1P",
        text: "bg-[#0000ff] font-[retro-font]",
        border: "border-2 border-[#0000ff] animate-pulse-scale"
    }
    playerTwoStyle = {
        content: "2P",
        text: "bg-[#ff3d03] font-[retro-font]",
        border: "border-2 border-[#ff3d03] animate-pulse-scale"
    }
    playerName = "font-[retro-font]"
    loadingText= "font-[retro-font] text-5xl animate-blink"
    startStyle = "animate-blink font-[retro-font] font-bold text-lg transition-transform text-center rounded-lg hover:scale-150"
}

const ThemeProvider = createContext(new Theme())

export const useTheme = (): Theme => { 
    return useContext(ThemeProvider)
}