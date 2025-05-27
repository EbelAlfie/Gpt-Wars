"use server";
import axios, { AxiosResponse } from "axios";
import { TurnResponse } from "../_data/model/TurnResponse";
import { RecentChatResponse } from "../_data/model/RecentChatResponse";
import { CharacterResponse } from "../_data/model/CharacterResponse";
import { CharacterDetailResponse, DetailResponse } from "../_data/model/DetailResponse";

export async function resurrectCharacter(chatId: string, token: string|undefined) {
    const config = {
        method: "GET",
        url: `https://neo.character.ai/chat/${chatId}/resurrect`,
        headers: {
            'authorization': `Token ${token}`
        }
    }

    return await axios.request(config)
        .then(response => response.data)
}

export async function fetchRecentChat(characterId: string, token: string|undefined): Promise<RecentChatResponse> {
    const config = {
        method: "GET",
        url: `https://neo.character.ai/chats/recent/${characterId}`,
        headers: {
            'authorization': `Token ${token}`
        }
    }

    return await axios.request<any, AxiosResponse<RecentChatResponse>, any>(config)
        .then(response => response.data)
}

export async function loadChatHistory(chatId: string, token: string|undefined): Promise<TurnResponse> {
    const config = {
        method: "GET",
        url: `https://neo.character.ai/turns/${chatId}/`,
        headers: {
            'authorization': `Token ${token}`
        }
    }

    return await axios.request<any, AxiosResponse<TurnResponse>, any>(config)
        .then(response => response.data)
}

export async function discoverCharacter() {
    const config = {
        method: "GET",
        url: `https://character.ai/api/trpc/character.info,character.info,discovery.recommended,character.infos,discovery.curatedLists,character.info,character.info,character.info,character.info,character.info,character.info,character.info,character.info,discovery.curatedCategories,discovery.charactersByCurated,discovery.recommended,character.info,character.info,character.info,character.info,character.info,character.info?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%222N3x_vHK560g59Byw_1ylyJueHEQFmhSN7Y2WthUf28%22%7D%7D%2C%221%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%22QPTJrucMDmL6m1KBV2gublIGvmDK3NK_rC6Ko2xvM30%22%7D%7D%2C%222%22%3A%7B%22json%22%3A%7B%22lang%22%3A%22en%22%7D%7D%2C%223%22%3A%7B%22json%22%3A%7B%22externalIds%22%3A%5B%22urbyXM6x0zES30KaccmMVgOZacYWAiIWJXIT0tVtLx4%22%2C%22TnvGYdpQ0TZdKEJz-7yuioJu64SB1yMdRqpAQRu2nFA%22%2C%22QXDEgGBzKUZdhX3ZdwyRofTxKbbVB2C7eZZF0Y_MoRE%22%2C%229SVWWx8k4E8ylSMZkefaBwIai0wmd5EZifDAqHpNgv4%22%2C%22jGkrRmLcHKoSlhsxt6F6Esom7GjUTL8oiRCGFj4Bj-U%22%2C%225IeEQXfXyNUyJiN0gyL4oukjPRMGOO1oYWCSfEGNDJU%22%2C%22AsQpRg3aqPTTjvBYCeD430N1V99zRz3bTp_5KJPqwkY%22%2C%22-ab-dMaIPAEauf6woOPOGPl10_uKz-BG2_JOv4YqSVw%22%2C%22g6td2ycE2yMx7CpyWi7yCYbz_9KisixIx2gy1h3lsG0%22%2C%22j4CMuM4iPB40-fc6rsugyzepRnUZNDvwoj0YDuwGHQ0%22%2C%22kf6Y8ZldmnWszLzVGENom7RBBTJcBcLUm-SiN7fxzQ8%22%2C%22IakmHQFS6IYkYi6OFP-t6Nw2lxKudpEpG0TFv_qy1fI%22%2C%22KzDfKE4-N40Tq1Vu__ocjnTKtwSSB0dw6P41bIbKcO8%22%2C%222PSWvO5FTkU777HtrwK6PMus-74t0QoyGcaaf0_4erE%22%2C%22pXUYe4sEcYpPX5MgjDmWD-tjFayBTAhLWutprMgu060%22%2C%22sg6VxpIxuV35p2Z__G6O0nf5fEj3AMDg20q6xEeh1cU%22%2C%22ucXrYPts-5Pc_Io7R_C4CMVp6E4jEhHR6roziAY4JAU%22%2C%22adqxJZYN5pmotPbH3003l_fLuMb_A-mxzxuHXV9acvI%22%2C%22RroqwJd04qaEkEnBEhEhrRfylV4457uYKuqmqjKtCd0%22%2C%22H-2IvIWET11IUOSTf5kB71cUyDZx4Ut7D-eeypQxrj8%22%2C%22y-h--Xu3pCi7hCAW8E-ekcJFxOvvPibJPUN4lv87uJ8%22%2C%22m8FIzcyy_IVTUEuI-Tb_ddsXgrEV4vFbBWL-LcOoa8A%22%2C%22ZuOwhp6vY4OTm0002pTeSuOja_b-YXSLoRmj0Lc4uUk%22%5D%7D%7D%2C%224%22%3A%7B%22json%22%3A%7B%22listIds%22%3A%5B%22cold_start_popular_characters_l30d_v1%22%2C%22cold_start_trending_characters_v1%22%5D%7D%7D%2C%225%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%22A9zlEuzpvWiH8h0PNWEvZPK-PQifYxS-V24D3ncqIyU%22%7D%7D%2C%226%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%22uD71krOYYFjVkYwspviH_8tYTybsf5eAGdwhNlFJAls%22%7D%7D%2C%227%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%22f4hEGbw8ywUrjsrye03EJxiBdooy--HiOWgU2EiRJ0s%22%7D%7D%2C%228%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%229ZSDyg3OuPbFgDqGwy3RpsXqJblE4S1fKA_oU3yvfTM%22%7D%7D%2C%229%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%22Hu84TYGgte3qVoQuy75x6Q1-ORjQbgoe2qaFoTkjaOM%22%7D%7D%2C%2210%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%22_FrgO6M-xCuTi72BYHbt-dQN2QsjNXnl-eKJGrjJttc%22%7D%7D%2C%2211%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%22WLcau8HDbkAPlnU9GPZvLVQ4QaWMhktCmgGFgG2nb5c%22%7D%7D%2C%2212%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%229wIR0NXzqD76sfJWRsHCGGb8IkPljhINj8WDy_2xjcg%22%7D%7D%2C%2213%22%3A%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D%2C%2214%22%3A%7B%22json%22%3A%7B%22category%22%3A%22Helpers%22%7D%7D%2C%2215%22%3A%7B%22json%22%3A%7B%22lang%22%3Anull%7D%2C%22meta%22%3A%7B%22values%22%3A%7B%22lang%22%3A%5B%22undefined%22%5D%7D%7D%7D%2C%2216%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%227yDt2WH6Y_OpaAV4GsxKcY5xIQ8QT5M0kgpDQ6VAflI%22%7D%7D%2C%2217%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%22W4MWmsvbFFnKF8b9e3Eg6ZUNzdhqvEZYy-tNRtxB_Og%22%7D%7D%2C%2218%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%226HhWfeDjetnxESEcThlBQtEUo0O8YHcXyHqCgN7b2hY%22%7D%7D%2C%2219%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%22YpuGnNPQiGvb0DIg77pDUruORvqEPQAxmabNuOIGylo%22%7D%7D%2C%2220%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%22YntB_ZeqRq2l_aVf2gWDCZl4oBttQzDvhj9cXafWcF8%22%7D%7D%2C%2221%22%3A%7B%22json%22%3A%7B%22externalId%22%3A%22GxP9L6QQ-qocxM9sYfvwywDw6wwfSmBJUjalAlD1ZCY%22%7D%7D%7D`,
    }
    return await axios.request<any, AxiosResponse<CharacterResponse>, any>(config)
        .then(response => response.data)
}

export async function getCharacterInfo(charId: string, token: string|undefined): Promise<DetailResponse> {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://neo.character.ai/character/v1/get_character_info',
        headers: { 
            'authorization': `Token ${token}`, 
            'Accept': 'application/json, text/plain, */*', 
            'accept-language': 'en-US,en;q=0.9,id;q=0.8', 
            'origin': 'https://character.ai', 
            'priority': 'u=1, i', 
            'referer': 'https://character.ai/', 
            'sec-ch-ua': '"Microsoft Edge";v="135", "Not-A.Brand";v="8", "Chromium";v="135"', 
            'sec-ch-ua-mobile': '?0', 
            'sec-ch-ua-platform': '"Linux"', 
            'sec-fetch-dest': 'empty', 
            'sec-fetch-mode': 'cors', 
            'sec-fetch-site': 'same-site', 
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0', 
            'Host': 'neo.character.ai', 
            'Content-Length': '73', 
            'Content-Type': 'application/json', 
            "Cache-Control": "no-cache",
        },
        data: {
            "external_id": charId,
            "lang": "en"
        }
    }

    return await axios.request<any, AxiosResponse<CharacterDetailResponse>, any>(config)
        .then(response => { 
            console.log(response.headers)
            return response.data
        })
        .catch(error => {
            console.log(error.request)
            console.log("Error")
            return error
        })
}