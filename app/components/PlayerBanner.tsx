import { CharacterItemModel } from "@/_characterai/_domain/response_model/CharacterItemModel";

export const PlayerBanner = ({model}: {model: CharacterItemModel|undefined}) => {
    if (!model) return null
    return <div className="flex flex-col justify-center size-min">
        <img 
            src={model.avatarFileName}
        />
        <p className="text-6xl">{model.name}</p>
    </div>
}