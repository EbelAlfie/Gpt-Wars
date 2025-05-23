import { CharacterResponse, ResultResponse } from "@/_characterai/_data/model/CharacterResponse";
import { CharacterItemModel } from "../response_model/CharacterItemModel";
import { CharacterDetailResponse } from "@/_characterai/_data/model/DetailResponse";
import { CharacterModel } from "../response_model/CharacterModel";

export const mapCharacterItemModel = (response: CharacterResponse): CharacterItemModel[] => {
    return response.map(item => {
        console.log(item)
        
        const {
            result,
            error
        } = item

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

export const mapCharacterModel = (response: CharacterDetailResponse): CharacterModel => {
    return  {
        externalId: response.external_id,
        title: response.title,
        name: response.name,
        greeting: response.greeting,
        dynamicGreetingEnabled: response.dynamic_greeting_enabled,
        allowDynamicGreeting: response.allow_dynamic_greeting,
        description: response.description,
        identifier: response.identifier,
        avatarFileName: `https://characterai.io/i/200/static/avatars/${response?.avatar_file_name ?? ""}`,
        songs: response.songs, //??
        imgGenEnabled: response.img_gen_enabled,
        baseImgPrompt: response.base_img_prompt,
        imgPromptRegex: response.img_prompt_regex,
        stripImgPromptFromMsg: response.strip_img_prompt_from_msg,
        defaultVoiceId: response.default_voice_id, //?
        starterPrompts: response.starter_prompts, //?
        commentsEnabled: response.comments_enabled, //?
        shortHash: response.short_hash,
        updated: response.updated,
        userUsername: response.user__username,
        participantName: response.participant__name,
        participantNumInteractions: response.participant__num_interactions,
        participantUserUsername: response.participant__user__username,
        voiceId: response.voice_id,
        usage: response.usage,
        definition: response.definition,
        hasDefinition: response.has_definition,
        upvotes: response.upvotes,
        isLicensedProfessional: response.is_licensed_professional
    }
}