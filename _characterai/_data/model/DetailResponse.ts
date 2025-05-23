export type DetailResponse = {
    character: CharacterDetailResponse,
    status: string
}

export type CharacterDetailResponse = {
    external_id: string,
    title: string,
    name: string,
    visibility: string,
    copyable: boolean,
    greeting: string,
    dynamic_greeting_enabled: boolean,
    allow_dynamic_greeting: boolean,
    description: string,
    identifier: string,
    avatar_file_name: string,
    songs: string, //??
    img_gen_enabled: boolean,
    base_img_prompt: string,
    img_prompt_regex: string,
    strip_img_prompt_from_msg: boolean,
    default_voice_id: string, //?
    starter_prompts: string, //?
    comments_enabled: string, //?
    short_hash: string,
    updated: string,
    user__username: string,
    participant__name: string,
    participant__num_interactions: number,
    participant__user__username: string,
    voice_id: string,
    usage: string,
    definition: string,
    has_definition: boolean,
    upvotes: number,
    is_licensed_professional: boolean
}