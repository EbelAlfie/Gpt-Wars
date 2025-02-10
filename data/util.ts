import { ChatRequirementResponse } from "./model/ChatRequirementResponse";
import { MeResponse } from "./model/MeResponse";

export const getEnforcementToken = async (chatRequirement: ChatRequirementResponse) => {
    if (!chatRequirement.proofofwork?.required)
        return null;
    const {seed: n, difficulty: r} = chatRequirement.proofofwork;
    return typeof n == "string" && typeof r == "string" ? (answers.has(n) || this.answers.set(n, this._generateAnswer(n, r)),
    "gAAAAAB" + await answers.get(n)) : null
}