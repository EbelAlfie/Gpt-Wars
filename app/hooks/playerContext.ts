import { CharacterItemModel } from "@/_characterai/_domain/response_model/CharacterItemModel";
import { createContext } from "react";

export const SelectedPlayer = createContext({
    selectedPlayer: new Array<CharacterItemModel>(2),
    setSelectedPlayer: (players: CharacterItemModel[]) => {}
})