export type ConversationRequest = {
    //header
    chatRequirementToken: string,
    proofToken: string,
    turnstileToken: string,
    requestBody: RequestBody
}

type RequestBody = {
    action: string,
    messages: MessageRequest,
    parent_message_id: string,
    model: string,
    timezone_offset_min: number,
    timezone: string,
    suggestions: string[],
    conversation_mode: ConversationMode,
    system_hints: string[],
    supports_buffering: boolean,
    supported_encodings: string[],
    client_contextual_info: ClientContextualInfo,
    paragen_cot_summary_display_override: string
}

type MessageRequest = {
    id: string,
    author: AuthorRequest,
    create_time: number,
    content: MessageContent,
    metadata: MessageMetadata,
    dictation: boolean
}

type AuthorRequest = {
    role: string
}

type MessageContent = {
    content_type: string //enum
    parts: string[]
}

type MessageMetadata = {
    serialization_metadata: { custom_symbol_offsets: [] }
}

type ConversationMode = { 
    kind: string
}

type ClientContextualInfo = {
    is_dark_mode: boolean,
    time_since_loaded: number,
    page_height: number,
    page_width: number,
    pixel_ratio: number,
    screen_height: number,
    screen_width: number
}