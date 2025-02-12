"use client"
import { constructTurnsTileToken, getEnforcementToken, getRequirementsToken } from "@/data/util";
import { ChatGptUseCase } from "@/domain/ChatGptUseCase";

export const useChat = async (useCase: ChatGptUseCase) => {
    const requirementToken = { "p": getRequirementsToken() }
    console.log("PE " + requirementToken.p)
    const chatRequirement = await useCase.getChatRequirement(requirementToken)
    if (chatRequirement instanceof Error) {

    }

    const turntileToken = await constructTurnsTileToken(chatRequirement.turnstile.dx)
    const proofToken = getEnforcementToken(chatRequirement)

    const a = useCase.openConversation({
        chatRequirementToken: chatRequirement.token,
        turnstileToken: turntileToken,
        proofToken: proofToken?? ""
    })
}