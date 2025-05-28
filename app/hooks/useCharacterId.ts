import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

export const useCharacterId = () => {
    const playersId = useSearchParams()
    
    const p1 = useMemo(() => playersId.get("p1") ?? "", [])
    const p2 = useMemo(() => playersId.get("p2") ?? "", [])

    return {p1, p2}
}