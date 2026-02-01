import { CharacterItemModel } from "@/_characterai/_domain/response_model/CharacterItemModel";
import { useCharacter } from "@/_characterai/hook/useCharacters"
import { CharacterItem } from "./CharacterItem";
import { useContext, useMemo, useState } from "react";
import { SelectedPlayer } from "../hooks/playerContext";
import { useTheme } from "../hooks/useTheme";
import { SearchBar } from "./SearchBar";
import { FightButton } from "./FightButton";

export const CharacterListScreen = (props: { 
    onFightClicked: () => void, 
    querytext: string,
    setQueryText: (arg: string) => void
}) => {
    const theme = useTheme()
    const characters = useCharacter()

    let layout

    switch (characters.type) {
        case "loaded":
            layout = <>
            <section className="flex flex-row justify-center self-center">
                <SearchBar className={`self-center ${theme.searchBarStyle}`} query={props.querytext} onTextChanged={props.setQueryText}/>
            </section>
            <section className="h-1/3 max-h-screen max-w-screen flex-grow bg-transparent p-6 overflow-y-scroll">
                <CharacterListContent characters={characters.data}/>
            </section>
            <section className="flex flex-row justify-center items-center max-w-full p-2">
                <FightButton onClick={props.onFightClicked}/>
            </section>
            </>
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
    const theme = useTheme()
    return (
        <div className="h-full flex justify-center items-center">
            <p className={`${theme.loadingText}`}>Loading...</p>
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