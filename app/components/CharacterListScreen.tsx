import { CharacterItemModel } from "@/_characterai/_domain/response_model/CharacterItemModel";
import { useCharacter } from "@/_characterai/hook/useCharacters"
import { CharacterItem } from "./CharacterItem";
import { useContext, useMemo, useState } from "react";
import { SelectedPlayer } from "../hooks/playerContext";

export const CharacterListScreen = () => {
    const characters = useCharacter()

    let layout

    switch (characters.type) {
        case "loaded":
            layout = <CharacterListContent characters={characters.data}/>
            break;
        case "error" :
            layout = <ErrorContent error={characters.error}/>
            break;
        default:
            layout = <LoadingContent />
    }
    return layout
}

const CharacterListContent = ({characters}: { characters: CharacterItemModel[] }) => {
    const {
        setSelectedPlayer
    } = useContext(SelectedPlayer)

    const [selectedChar, setSelected] = useState(new Array<number>(2))
    const [playerState, setPlayerState] = useState(0)

    const onCharacterSelected = (index: number) => {
        const list: Array<number> = [...selectedChar]

        const pos = list.findIndex(value => value === index)
        if (pos !== undefined) {
            const temp = list[playerState]
            list[pos] = temp
            
        } 
        list[playerState] = index

        setPlayerState(playerState === 0 ? 1 : 0)
        setSelected(list)
        
        setSelectedPlayer(list.map(id => characters[id]))
    }

    const item = useMemo(() =>
        characters.map((character, index) => 
            character && <CharacterItem 
                character={character} 
                selected={selectedChar.findIndex(value => value === index)}
                key={index}
                onSelected ={() => onCharacterSelected(index)}
            />
        ), 
        [characters, selectedChar]
    )

    return <ul className="grid lg:grid-cols-4 grid-cols-2 gap-2">
        {item}
    </ul>
}

const LoadingContent = () => {
    return (
        <div className="w-auto">
            Loading
        </div>
    )
} 

const ErrorContent = ({error}: { error: Error }) => {
    return (
        <div className="w-auto">
            <p>{error.message}</p>
        </div>
    )
}