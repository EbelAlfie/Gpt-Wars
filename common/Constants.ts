export enum CompletionType {
    Next = "next",
    Variant = "variant"
}

export enum Role { 
    Root = "root",
    User = "user",
    Assistant = "assistant"
}

export enum ChatEvent {
    DeltaEncoding = "delta_encoding",
    Delta = "delta",
    Ping = "ping"
}

export enum OperationTypes {
    Patch = "patch",
    Add = "add",
    Remove = "remove",
    Replace = "replace",
    Append = "append",
    Truncate = "truncate"
}