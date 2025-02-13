import { generateSid } from "@/data/util";

export function createTree() {
    return {
        root: {
            id: "root",
            children: [],
            parentId: "",
            message: createRootMessage()
        }
    }
}
export function createRootMessage() {
    return {
        id: createId("aaa1"),
        author: {
            role: "root"
        },
        content: {
            content_type: "text",
            parts: []
        }
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