// import { EventCodes } from "@/common/Constants";

// export class DeltaManager {
//     prevObjByChannel = [];
//     prevDelta = {
//         channel: 0,
//         op: "add",
//         path: "",
//         value: void 0
//     };
//     applyDelta(data: any) {
//         try {
//             const n = this.decodeDelta(data)
//               , r = n.channel
//               , s = this.prevObjByChannel[r]
//               , a = l$(s, n);
//             return this.prevObjByChannel[r] = a,
//             a
//         } catch (n) {
//             q.addError(`Error applying delta: ${n}`)
//         }
//     }
//     decodeDelta(data: any) {
//         const n = o$(data, this.prevDelta)
//           , r = $x(n);
//         return this.prevDelta = r,
//         r
//     }
// }

// function $x(e: any) {
//     const t = e;
//     for (const [n,r] of EventCodes)
//         r in e && (t[n] = e[r],
//         delete e[r]);
//     return t.op === "patch" && (t.value = t.value.map($x)),
//     t
// }

// function o$(data: any, t: any) {
//     for (const [n,r] of EventCodes)
//         n !== "value" && !(r in data) && (data[r] = t[n]);
//     return data
// }

// function l$(e: any, t: any) {
//     return Op({
//         __root: e
//     }, r => Hx(r, t)).__root
// }

// function Hx(e, t) {
//     const n = d$(t.path ?? "");
//     for (let s = 0; s < n.length - 1; s++)
//         e[n[s]] === void 0 && (typeof n[s + 1] == "number" ? e[n[s]] = [] : e[n[s]] = {}),
//         e = e[n[s]];
//     const r = n[n.length - 1];
//     switch (t.op) {
//     case "patch":
//         for (const s of t.value) {
//             const a = {
//                 __root: e[r]
//             };
//             Hx(a, s),
//             e[r] = a.__root
//         }
//         break;
//     case "add":
//         Array.isArray(e) ? e.splice(r, 0, t.value) : e[r] = t.value;
//         break;
//     case "remove":
//         Array.isArray(e) ? e.splice(r, 1) : delete e[r];
//         break;
//     case "replace":
//         e[r] = t.value;
//         break;
//     case "append":
//         if (typeof e[r] == "string")
//             e[r] += t.value;
//         else if (Array.isArray(e[r]))
//             e[r].push(...f$(t.value));
//         else if (y9(e[r]) && y9(t.value))
//             for (let s in t.value)
//                 e[r][s] = t.value[s];
//         else
//             e[r] = t.value;
//         break;
//     case "truncate":
//         e[r] && (typeof e[r] == "string" ? e[r] = e[r].substring(0, t.value) : Array.isArray(e[r]) && (e[r].length = t.value));
//         break;
//     default:
//         throw new Error("Unknown json delta operation")
//     }
// }