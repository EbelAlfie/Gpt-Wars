import { CharacterModel } from "@/_characterai/_domain/response_model/CharacterModel";
import { useCharacter } from "@/_characterai/hook/useCharacters"

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
    return <ul className="">

    </ul>
}

const LoadingContent = () => {
    return (
        <div></div>
    )
} 

const ErrorContent = ({error}: { error: Error }) => {
    return (
        <div></div>
    )
}