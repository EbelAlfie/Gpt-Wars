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
            return response
        })
        .catch(error => {
            console.log(error)
            return error
        })
    }

    async openConversation(request: ConversationRequest) {
        return this.repository.openConversation(request)
            .then(response => {
                const data = response.data
                console.log(data)
                return data
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }
}