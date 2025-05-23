export type CharacterModel = {
    externalId: string,
    title: string,
    name: string,
    greeting: string,
    dynamicGreetingEnabled: boolean,
    allowDynamicGreeting: boolean,
    description: string,
    identifier: string,
    avatarFileName: string,
    songs: string, //??
    imgGenEnabled: boolean,
    baseImgPrompt: string,
    imgPromptRegex: string,
    stripImgPromptFromMsg: boolean,
    defaultVoiceId: string, //?
    starterPrompts: string, //?
    commentsEnabled: string, //?
    shortHash: string,
    updated: string,
    userUsername: string,
    participantName: string,
    participantNumInteractions: number,
    participantUserUsername: string,
    voiceId: string,
    usage: string,
    definition: string,
    hasDefinition: boolean,
    upvotes: number,
    isLicensedProfessional: boolean
}