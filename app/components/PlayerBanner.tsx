import { CharacterItemModel } from "@/_characterai/_domain/response_model/CharacterItemModel";
import { useTheme } from "../hooks/useTheme";

export const PlayerBanner = ({model}: {model: CharacterItemModel|undefined}) => {
    const theme = useTheme()
    if (!model) return null
    return <div className="flex flex-col items-center">
        <img 
            className="w-auto"
            src={model.avatarFileName}
        />
        <p className={`${theme.playerName} text-2xl mt-8 text-center`}>{model.name}</p>
    </div>
}