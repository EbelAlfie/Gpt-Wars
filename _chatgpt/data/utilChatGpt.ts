"use client"
import { sha3_512 } from "js-sha3";
import { ChatRequirementResponse } from "./model/ChatRequirementResponse";
import { ServerEvent } from "@/_chatgpt/domain/entity/ServerEvent";

export const answers = new Map<string, string>()

export const getEnforcementToken = (chatRequirement: ChatRequirementResponse): string| null => {
    if (!chatRequirement.proofofwork?.required)
        return null;
    const {seed: n, difficulty: r} = chatRequirement.proofofwork;
    return typeof n == "string" && typeof r == "string" ? (answers.has(n) || answers.set(n, generateAnswer(n, r)),
    "gAAAAAB" + answers.get(n)) : null
}

/*
    t = resolve
    n = reject
*/ 
export const constructTurnsTileToken = (turnsToken: string): Promise<string> => {
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

export function generateAnswer(seed: string, difficulty: string) {
    const maxAttempts = 500000
    let r = "e";
    const o = performance.now();
    try {
        const s = getConfig();

        for (let i = 0; i < maxAttempts; i++) {
            // (!a || a.timeRemaining() <= 0) && (a = await d0()),
            s[3] = i 
            s[9] = Math.round(performance.now() - o); //s[9]
            const c = textDecoder(s);
            if (sha3_512(seed + c).substring(0, difficulty.length) <= difficulty)
                return c
        }
    } catch (a) {
        console.log(a)
        r = textDecoder("" + a)
    }
    return "wQ8Lk5FbGpA2NcR9dShT6gYjU7VxZ4D" + r
}

function getConfig() {
    return [
        screen?.width + screen?.height, 
        "" + new Date, 
        performance?.memory?.jsHeapSizeLimit, 
        Math?.random(), 
        navigator?.userAgent, 
        jo(Array.from(document.scripts).map(t => t?.src).filter(t => t)), 
        (Array.from(document.scripts || []).map(t => t?.src?.match("c/[^/]*/_")).filter(t => t?.length)[0] ?? [])[0] ?? document.documentElement.getAttribute("data-build"), 
        navigator.language, 
        navigator.languages?.join(","), 
        Math?.random(), 
        u0(), 
        jo(Object.keys(document)), 
        jo(Object.keys(window)), 
        performance.now(), 
        generateSid(), 
        [...new URLSearchParams(window.location.search).keys()].join(","), 
        navigator?.hardwareConcurrency, 
        performance.timeOrigin
    ]
}

export function generateSid() {
    return crypto.randomUUID()
}

function textDecoder(text: any) {
    return text = JSON.stringify(text),
    window.TextEncoder ? btoa(String.fromCharCode(...new TextEncoder().encode(text))) : btoa(unescape(encodeURIComponent(text)))
}

export function getRequirementsToken() {
    const requirementsSeed = `${Math.random()}`
    return answers.has(requirementsSeed) || answers.set(requirementsSeed, generateAnswer(requirementsSeed, "0")),
    "gAAAAAC" + answers.get(requirementsSeed)
}

//Garbage function
function jo(e: string[]) {
    return e[Math.floor(Math.random() * e.length)]
}

function u0() {
    const e = jo(Object.keys(Object.getPrototypeOf(navigator)));
    try {
        return `${e}−${navigator[e].toString()}`
    } catch {
        return `${e}`
    }
}

//Response Stream processor
export function HD(e: (array: Uint8Array, limit: number) => void) {
    let t: Uint8Array| void, n: any, r: any, s: any = !1;
    return function(i: Uint8Array) {
        t === void 0 ? (t = i,
        n = 0,
        r = -1) : t = VD(t, i);
        const l = t.length;
        let c = 0;
        for (; n < l; ) {
            s && (t[n] === 10 && (c = ++n),
            s = !1);
            let d = -1;
            for (; n < l && d === -1; ++n)
                switch (t[n]) {
                case 58:
                    r === -1 && (r = n - c);
                    break;
                case 13:
                    s = !0;
                case 10:
                    d = n;
                    break
                }
            if (d === -1)
                break;
            e(t.subarray(c, d), r),
            c = n,
            r = -1
        }
        c === l ? t = void 0 : c !== 0 && (t = t.subarray(c),
        n -= c)
    }
}

export function decoder(n: (message: any) => void) {
    let r = m9();
    const s = new TextDecoder;
    return function(i: Uint8Array, l: number) {
        if (i.length === 0)
            n?.(r),
            r = m9();
        else if (l > 0) {
            const c = s.decode(i.subarray(0, l))
              , d = l + (i[l + 1] === 32 ? 2 : 1)
              , f = s.decode(i.subarray(d));
            switch (c) {
            case "data":
                r.data = r.data ? r.data + `` + f : f;
                break;
            case "event":
                r.event = f;
                break;
            case "id":
                // e(r.id = f);
                break;
            case "retry":
                const m = parseInt(f, 10);
                // isNaN(m) || t(r.retry = m);
                break
            }
        }
    }
}

function VD(e: Uint8Array, t: Uint8Array) {
    const n = new Uint8Array(e.length + t.length);
    return n.set(e),
    n.set(t, e.length),
    n
}

function m9() : ServerEvent {
    return {
        data: "",
        event: "",
        id: "",
        retry: 0
    }
}