export type ChatRequirementResponse = {
    persona: string,
    token: string,
    turnstile: TurnsTileResponse,
    proofofwork: ProofOfWorkResponse
}

type TurnsTileResponse = {
    required: Boolean,
    dx: string
}

type ProofOfWorkResponse = {
    required: Boolean,
    seed: Number,
    difficulty: string
}