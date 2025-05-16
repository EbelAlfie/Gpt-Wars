import { CandidatesResponse, TurnHistoryResponse, TurnResponse } from "@/app/_characterai/_data/model/TurnResponse"

export type ChatTurnHistory = {
    readonly turnKey: TurnKey,
    readonly createTime: string,
    readonly lastUpdatedTime: string,
    readonly state: string,
    readonly author: AuthorModel,
    readonly candidates: CandidatesModel[],
    readonly primaryId: string
}

export type TurnKey = {
    readonly chatId: string,
    readonly turnId: string
}

export type AuthorModel = {
    readonly authorId: string, //Either char id, me or another
    readonly isHuman: Boolean,
    readonly name: string
}

export type CandidatesModel = {
    readonly candidateId: string,
    readonly createTime: string,
    readonly rawContent: string,
    readonly isFinal: Boolean
}

export const mapTurnHistory = ({ turns }: TurnResponse): ChatTurnHistory[] => {
    return turns.map((turn: TurnHistoryResponse) => parseTurn(turn))
}

export const parseTurn = ({
    turn_key,
    create_time,
    last_updated_time,
    state,
    author,
    candidates,
    primary_id
}: TurnHistoryResponse): ChatTurnHistory => {
    const turnKey: TurnKey = {
        chatId: turn_key?.chat_id ?? "",
        turnId: turn_key?.turn_id ?? ""
    }

    const authorModel: AuthorModel = {
        authorId: author?.author_id ?? "",
        isHuman: author?.is_human ?? false,
        name: author?.name ?? ""
    }

    const candidatesModel: CandidatesModel[] = candidates?.map((item: CandidatesResponse) => {
        return {
            candidateId: item?.candidate_id,
            createTime: item?.create_time,
            rawContent: item?.raw_content,
            isFinal: item?.is_final
        }
    }) ?? []

    return {
        turnKey: turnKey,
        createTime: create_time,
        lastUpdatedTime: last_updated_time,
        state: state,
        author: authorModel,
        candidates: candidatesModel,
        primaryId: primary_id
    }
}