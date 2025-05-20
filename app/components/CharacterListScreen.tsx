import { CharacterModel } from "@/_characterai/_domain/response_model/CharacterModel";
import { useCharacter } from "@/_characterai/hook/useCharacters"
import { CharacterItem } from "./CharacterItem";
import { useMemo } from "react";

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
    const item = useMemo(() => 
        characters.map(character => <CharacterItem character={character} />), 
        [characters]
    )

    return <ul className="w-full h-full bg-slate-700">
        {item}
    </ul>
}

const LoadingContent = () => {
    return (
        <div>
            Loading
        </div>
    )
} 

const ErrorContent = ({error}: { error: Error }) => {
    return (
        <div>
            <p>{error.message}</p>
        </div>
    )
}