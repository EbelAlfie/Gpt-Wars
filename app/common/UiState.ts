export type Loading = { type:"loading" }
export type Loaded<T> = { type:"loaded", data: T } 
export type Failed = { type:"error", error: Error }

export function setLoaded<dataType>(data: dataType): Loaded<dataType> { 
    return { type:"loaded", data: data } 
}
export function setLoading(): Loading { return { type:"loading" } }
export function setError(error: Error): Failed { return { type:"error", error: error } }