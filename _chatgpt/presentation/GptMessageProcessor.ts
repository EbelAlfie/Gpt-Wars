import { OperationTypes } from "@/common/Constants";
import { mapServerDataToMessage } from "@/_chatgpt/domain/entity/MessageMapper";
import { EventCodes, ServerData } from "@/_chatgpt/domain/entity/ServerEvent";
import { Message } from "@/app/chat/_model/Message";

export class GptMessageProcessor {
    prevObj = []
    prevData: ServerData = {
        channel: 0,
        op: "add",
        path: "",
        value: ""
    };

    process(data: any, chatList: ServerData[] = []) {
        const decodedData: ServerData = this.decodeData(data)
        console.log(decodedData)
        return this.onOperation(decodedData, chatList)
    }

    decodeData(data: any) {
        const n = this._decode(data, this.prevData)
          , r = this._convert(n)
        return this.prevData = r,
        r
    }

    _decode(data: any, prevData: ServerData) {
        for (const [n,r] of EventCodes)
            n !== "value" && !(r in data) && n in prevData && (data[r] = prevData[n]);
        return data
    }

    _convert(e: any): ServerData {
        const t = e;
        for (const [n,r] of EventCodes)
            r in e && (t[n] = e[r],
            delete e[r]);
        return t.op === "patch" && (t.value = t.value.map(this._convert)),
        t
    }

    onOperation(
        data: ServerData,
        curList: ServerData[]
    ): Message[] {
        let newList: Message[] = [] 
        switch(data.op) {
            case OperationTypes.Patch: {
                for (const subValue of data.value) {
                    const subData = JSON.parse(subValue)
                    // newList = this.onOperation(subData, newList)
                }
                break;
            }
            case OperationTypes.Add: {
                const message = mapServerDataToMessage(data)
                Array.isArray(curList) && newList.push(message)
                break;
            }
            case OperationTypes.Remove: {
                const index = curList.findIndex(item => item === data)
                index > -1 && delete newList[index]
                break;
            }
            case OperationTypes.Replace: {
                // curList[r] = t.value;
                break;
            }
            case OperationTypes.Append: {
                const index = curList.findIndex(item => item.channel === this.prevData.channel)
                index > -1 && (
                    newList[index].content += mapServerDataToMessage(curList[index]).content
                )
                break
            }
            case OperationTypes.Truncate: {
                // curList[r] && (typeof curList[r] == "string" ? curList[r] = curList[r].substring(0, t.value) : Array.isArray(curList[r]) && (curList[r].length = t.value));
                break;
            }
            default:
                break;
        }
        return newList
    }
}