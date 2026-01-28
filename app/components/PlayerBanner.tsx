import { CharacterItemModel } from "@/_characterai/_domain/response_model/CharacterItemModel";

export const PlayerBanner = ({model}: {model: CharacterItemModel|undefined}) => {
    if (!model) return null
    return <div className="flex flex-col items-center">
        <img 
            className="w-full"
            src={model.avatarFileName}
        />
        <p className="text-3xl mt-8 text-center">{model.name}</p>
    </div>
}