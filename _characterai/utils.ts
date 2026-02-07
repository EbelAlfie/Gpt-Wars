export const getRequestId = (characterId: string) => {
    const instanceId = characterId.slice(-12)
    return getUUID().slice(0, 24) + instanceId
}

export const getUUID = () => { 
    if (crypto && crypto.randomUUID) return crypto.randomUUID()
    let e = new Date().getTime()
        , t = "undefined" != typeof performance && performance.now && 1e3 * performance.now() || 0
        , n = "89ab"[Math.floor(4 * Math.random())];
    return `xxxxxxxx-xxxx-4xxx-${n}xxx-xxxxxxxxxxxx`.replace(/[xy]/g, n => {
        let r = 16 * Math.random();
        return e > 0 ? (r = (e + r) % 16 | 0,
        e = Math.floor(e / 16)) : (r = (t + r) % 16 | 0,
        t = Math.floor(t / 16)),
        ("x" === n ? r : 7 & r | 8).toString(16)
    })
}