import { DeltaManager } from "@/app/chatgpt/DeltaManager";
import { ChatEvent } from "@/common/Constants";

export type ServerEvent = {
    data: string,
    event: string,
    id: string,
    retry: number
}

let f: DeltaManager| null = null
export function serverEventDataToMessage(serverEvent: ServerEvent) : Message {
    const data = JSON.parse(serverEvent.data)
    if ("error" in data) {
        //Ada error
    } else {
        if (serverEvent.event === ChatEvent.DeltaEncoding) {
            f = new DeltaManager()
        } else if (serverEvent.event === ChatEvent.Delta) {
            f?.applyDelta()
        }
    }
}

const i = (event: any) => {
    switch (event.type) {
        case "error":
            handleError(event);
            break;
        case "num_variants_in_stream":
            bindVariantInfoToTree(event);
            break;
        case "moderation":
            handleModeration(event);
            break;
        case "url_moderation":
            handleUrlModeration(event);
            break;
        case "message":
            handleMessage(event),
            debouncedUpdateCompletion();
            break;
        case "done":
            handleDone();
            break;
        case "gizmo_inline_review":
            handleGizmoInlineReview(event);
            break;
        case "title_generation":
            handleTitleGeneration(event);
            break;
        case "conversation_detail_metadata":
            handleConversationDetailMetadata(event);
            break
        }
}