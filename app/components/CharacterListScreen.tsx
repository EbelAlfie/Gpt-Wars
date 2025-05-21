import { CharacterModel } from "@/_characterai/_domain/response_model/CharacterModel";
import { useCharacter } from "@/_characterai/hook/useCharacters"
import { CharacterItem } from "./CharacterItem";
import { useCallback, useMemo, useState } from "react";

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

const CharacterListContent = ({characters}: { characters: CharacterModel[] }) => {
    const [selectedChar, setSelected] = useState(new Array<number>(2))

    const onCharacterSelected = useCallback((index: number) => {
        let list: Array<number> = selectedChar 
        const pos = list.find((value) => value === index)
        if (pos !== undefined) return 

        if (list.length >= 2) list.shift()
        list.push(index)
    
        setSelected(Array(...list))
    }, [])

    const item = useMemo(() => //TODO temporary
        characters.map((character, index) => 
            <CharacterItem 
                character={character} 
                selected={selectedChar.find(value => value === index) !== undefined}
                key={index}
                onSelected ={() => onCharacterSelected(index)}
            />
        ), 
        [characters, selectedChar]
    )

    return <ul className="grid grid-cols-5 gap-4 w-auto h-full max-w-full bg-slate-700 p-6">
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