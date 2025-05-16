export interface TurnResponse { 
    readonly turns: TurnHistoryResponse[]
}

export type TurnHistoryResponse = {
    readonly turn_key: TurnKeyResponse,
    readonly create_time: string,
    readonly last_updated_time: string,
    readonly state: string,
    readonly author: AuthorResponse,
    readonly candidates: CandidatesResponse[],
    readonly primary_id: string
}

export type TurnKeyResponse = {
    readonly chat_id: string,
    readonly turn_id: string
}

export type AuthorResponse = {
    readonly author_id: string, //Either char id, me or another
    readonly is_human: Boolean,
    readonly name: string
}

export type CandidatesResponse = {
    readonly candidate_id: string,
    readonly create_time: string,
    readonly raw_content: string,
    readonly is_final: Boolean
}