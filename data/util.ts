import { ChatRequirementResponse } from "./model/ChatRequirementResponse";
import { MeResponse } from "./model/MeResponse";

export const getEnforcementToken = async (chatRequirement: ChatRequirementResponse) => {
    if (!chatRequirement.proofofwork?.required)
        return null;
    const {seed: n, difficulty: r} = chatRequirement.proofofwork;
    return typeof n == "string" && typeof r == "string" ? (answers.has(n) || this.answers.set(n, this._generateAnswer(n, r)),
    "gAAAAAB" + await answers.get(n)) : null
}

/*
    t = resolve
    n = reject
*/ 
export const constructTurnsTileToken = (turnsToken: string) => {
    const key1 = 3
    const key2 = 4
    const vs = 9
    const df = 16
    const map = new Map() ;
    return new Promise( (t, n) => {
        let r = 0;
        setTimeout( () => t("" + r), 100),
        map.set(key1, (o: string) => t(btoa("" + o))),
        map.set(key2, (o: string) => n(btoa("" + o)));
        try {
            for (map.set(vs, JSON.parse(ff(atob(turnsToken), "" + map.get(df)))); map.get(vs).length > 0; ) {
                const [o,...a] = map.get(vs).shift();
                map.get(o)(...a),
                r++
            }
            t(btoa("" + r))
        } catch (o) {
            t(btoa(r + ": " + o))
        }
    }
    )
}

function ff(e: string, t: string) {
    let n = "";
    for (let r = 0; r < e.length; r++)
        n += String.fromCharCode(e.charCodeAt(r) ^ t.charCodeAt(r % t.length));
    return n
}

export async function generateAnswer(seed: string, difficulty: string) {
    const maxAttempts = 500000
    
    let r = "e";
    const o = performance.now();
    try {
        let a = null;
        const s = this.getConfig();
        for (let i = 0; i < maxAttempts; i++) {
            (!a || a.timeRemaining() <= 0) && (a = await d0()),
            s[3] = i,
            s[9] = Math.round(performance.now() - o);
            const c = ml(s);
            if (i0.sha3_512(seed + c).substring(0, difficulty.length) <= difficulty)
                return c
        }
    } catch (a) {
        r = ml("" + a)
    }
    return "wQ8Lk5FbGpA2NcR9dShT6gYjU7VxZ4D" + r
}