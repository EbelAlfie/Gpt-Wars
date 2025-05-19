import { CharacterResponse } from "@/_characterai/_data/model/CharacterResponse";
import { CharacterModel } from "../response_model/CharacterModel";

export const mapCharacterModel = (response: CharacterResponse): CharacterModel => {
    const data = response.result.data.json.character ?? {}
    return {
        externalId: data.external_id ?? "",
        title: data.title ?? "",
        name: data.name ?? "",
        avatarFileName: data.avatar_file_name ?? "",
        description: data.description ?? ""
    }
}