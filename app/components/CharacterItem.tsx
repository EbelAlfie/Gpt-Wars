import { CharacterModel } from "@/_characterai/_domain/response_model/CharacterModel"

export const CharacterItem = ({ character }: { character: CharacterModel }) => {
    return <>
        <div className="rounded-full bg-slate-600 p-10">
            <img 
                className="m-5"
                src={character.avatarFileName}
            />
            <p className="text-lg my-2">{character.name}</p>
            <p className="text-sm my-2">{character.description}</p>
        </div>
    </>
}