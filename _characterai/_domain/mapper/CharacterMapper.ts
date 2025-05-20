import { CharacterResponse, ResultResponse } from "@/_characterai/_data/model/CharacterResponse";
import { CharacterModel } from "../response_model/CharacterModel";

export const mapCharacterModel = (response: CharacterResponse): CharacterModel[] => {
    return response.map(item => {
        console.log(item)
        
        const {
            result,
            error
        } = item
        
        // if (result) {
        //     const data = result.data?.json?.character
        //     return {
        //         externalId: data?.external_id ?? "",
        //         title: data?.title ?? "",
        //         name: data?.name ?? "",
        //         avatarFileName: `https://characterai.io/i/200/static/avatars/${data?.avatar_file_name ?? ""}`,
        //         description: data?.description ?? ""
        //     }
        // }

        const data = result?.data?.json?.character
            return {
                externalId: data?.external_id ?? "",
                title: data?.title ?? "",
                name: data?.name ?? "",
                avatarFileName: `https://characterai.io/i/200/static/avatars/${data?.avatar_file_name ?? ""}`,
                description: data?.description ?? ""
            }
    })  
}