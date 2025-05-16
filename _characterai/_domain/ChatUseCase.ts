import { ChatRepository } from "@/app/_characterai/_data/ChatRepository";
import { mapRecentChat, RecentChatModel } from "./response_model/RecentChat";
import { ChatTurnHistory, mapTurnHistory, parseTurn } from "./response_model/ChatTurnHistory";
import { ChatEventType } from "@/app/global/ConstEnum";
import { getRequestId } from "../utils";

export class ChatUseCase {
    userId = "58584831"
    userName = "SethAriblaze"
    repository: ChatRepository = new ChatRepository()

    public async resurectCharacter(charId: string) {
        return this.repository.resurectCharacter(charId)
            .then(response => {
                console.log("resurrect " + response)
                return response
            })
            .catch(error => error)
    }

    public async fetchRecentChat(characterId: string): Promise<RecentChatModel> {
        return this.repository.fetchRecentChat(characterId)
            .then(response => mapRecentChat(response))
            .catch(error => {
                console.log(error)
                return error
            })
    }

    public async loadChatHistory(chatId: string): Promise<ChatTurnHistory[]> {
        return this.repository.loadChatHistory(chatId)
            .then(response => mapTurnHistory(response))
            .catch(error => {
                console.log(error)
                return error
            })
    }

    public openWebsocketConnection() {
        this.repository.openChatConnection()
    }

    public closeWebsocketConnection() {
        this.repository.closeConnection()
    }

    public async sendMessage(
        chatId: string,
        characterId: string,
        message: string
    ) {
        const eventType = ChatEventType.CREATE_GENERATE
        const requestId = getRequestId(characterId)
        const primaryCandidateId = crypto.randomUUID() 
        const turnId = crypto.randomUUID() 

        const model = {
            command: eventType,
            request_id: requestId,
            payload: {
                num_candidates: 1,
                tts_enabled: false,
                selected_language: "",
                character_id: characterId,
                user_name: this.userName,
                turn: {
                    turn_key: {
                        turn_id: turnId,
                        chat_id: chatId
                    },
                    author: {
                        author_id: this.userId,
                        is_human: true,
                        name: this.userName
                    },
                    candidates: [
                        {
                            candidate_id: primaryCandidateId,
                            raw_content: message
                        }
                    ],
                    primary_candidate_id: primaryCandidateId
                },
                "previous_annotations": {
                    "boring": 0,
                    "not_boring": 0,
                    "inaccurate": 0,
                    "not_inaccurate": 0,
                    "repetitive": 0,
                    "not_repetitive": 0,
                    "out_of_character": 0,
                    "not_out_of_character": 0,
                    "bad_memory": 0,
                    "not_bad_memory": 0,
                    "long": 0,
                    "not_long": 0,
                    "short": 0,
                    "not_short": 0,
                    "ends_chat_early": 0,
                    "not_ends_chat_early": 0,
                    "funny": 0,
                    "not_funny": 0,
                    "interesting": 0,
                    "not_interesting": 0,
                    "helpful": 0,
                    "not_helpful": 0
                }
            }
        }

        this.repository.sendMessage(JSON.stringify(model))
    }

    public async createChatRoom(characterId: string) {
        const payload = {
            command: ChatEventType.CREATE_CHAT,
            request_id: getRequestId(characterId),
            payload: {
                chat: {
                    chat_id: getRequestId(characterId),
                    creator_id: this.userId,
                    visibility: "VISIBILITY_PRIVATE",
                    character_id: characterId,
                    type: "TYPE_ONE_ON_ONE"
                },
                "with_greeting": true
            },
        }
        this.repository.sendMessage(JSON.stringify(payload))
    }

    registerOpenListener(listener: (message: Event) => void) {
        this.repository.onOpen = listener
    }

    registerErrorListener(listener: (message: Event) => void) {
        this.repository.onError = listener
    }

    registerMessageListener(listener: (messageTurn: ChatTurnHistory, command: string) => void) {
        const messageParser = (message: MessageEvent) => {
            const data = JSON.parse(message?.data) ?? {}
            const command = data?.command ?? ""
            const turn = data?.turn ?? {}
            const parsedTurn = parseTurn(turn)

            listener(parsedTurn, command)
        }
        this.repository.onMessage = messageParser
    }
}