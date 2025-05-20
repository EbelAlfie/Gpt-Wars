import { CharacterModel } from "@/_characterai/_domain/response_model/CharacterModel"

export const CharacterItem = ({ character }: { character: CharacterModel }) => {
    return <>
        <div className="flex flex-col w-min h-min p-10 rounded-lg bg-slate-600 items-center">
            <img 
                className="m-5 size-40"
                src={character.avatarFileName}
            />
            <p className="text-lg my-2 text-white">{character.name}</p>
            <p className="text-sm my-2 text-white text-ellipsis line-clamp-6">{character.description}</p>
        </div>
    </>
}