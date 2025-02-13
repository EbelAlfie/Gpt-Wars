import { Role } from "@/common/Constants";
import { generateSid } from "@/data/util";
import { MessageRequest } from "@/domain/model/ConversationRequest";

export function createMessage(
    role: Role,
    message: string
): MessageRequest {
    return {
        id: "0a54937a-7518-4b52-8461-2e2a16d8c0cd",
        author: {
            role: role
        },
        content: {
            content_type: "text",
            parts: [message]
        },
        create_time: 1, 
        metadata : {serialization_metadata:{"custom_symbol_offsets":[]}}, 
        dictation: false
    }
}

function createId(e: string) {
    const t = generateSid()
    return `${e}${t?.substring(e.length)}`
}

export function getSelfConfiguration() {
    return  {
        is_dark_mode: false,
        time_since_loaded: Math.floor(performance.now() / 1e3),
        page_height: window?.innerHeight,
        page_width: window?.innerWidth,
        pixel_ratio: window?.devicePixelRatio,
        screen_height: window?.screen?.height,
        screen_width: window?.screen?.width
    }
}