import { ChatGptRepository } from "@/data/ChatGptRepository";
import { ChatRequirementRequest } from "./model/ChatRequirementRequest";
import { ConversationRequest } from "./model/ConversationRequest";

export class ChatGptUseCase {
    repository: ChatGptRepository = new ChatGptRepository()

    async initMe() {
        return this.repository.initMe()
    }

    async getChatRequirement(request: ChatRequirementRequest) {
        return this.repository.getChatRequirement(request)
        .then(response => {
            return response.data
        })
    }

    async openConversation(request: ConversationRequest) {
        return this.repository.openConversation(request)
    }
}