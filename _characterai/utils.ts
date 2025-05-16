export const getRequestId = (characterId: string) => {
    const instanceId = characterId.slice(-12)
    return crypto.randomUUID().slice(0, 24) + instanceId
}