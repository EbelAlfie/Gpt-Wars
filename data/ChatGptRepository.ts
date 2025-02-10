import axios from "axios"

class ChatGptRepository {
    webSocket: WebSocket| null = null

    constructor() {}

    onOpen(event: Event) {}
    onError(event: Event) {}
    onMessage(event: MessageEvent) {}

    openWebsocket() {
        this.webSocket = new WebSocket("")
        this.webSocket.onopen = this.onOpen
        this.webSocket.onmessage = this.onMessage
        this.webSocket.onerror = this.onError
    }

    async openConversation() {
        let data = JSON.stringify({});

            let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'https://chatgpt.com/backend-anon/conversation',
            headers: { 
                'accept': 'text/event-stream', 
                'accept-language': 'en-US,en;q=0.9,id;q=0.8', 
                'content-type': 'application/json', 
                'cookie': 'oai-did=43aec8ad-68ef-489b-872a-c24181ff7569; oai-nav-state=1; oai-sc=0gAAAAABnjRdOzzaZ03YDBkjUg72x-5EcZjYHcs-EPavBvVsUp8SHLO2rnMZNaAo4n50b_xedluHKL1JpdTDpZVJe-bKNKeK6VhbZqFIdnLsZPZeDBKEMuo_eGOJstfcLif82O4osLDFA36fa0HqbBCUwbnyxe8z1X7aints5tzHIIzfUKQw_PiIN4PhW7KF3pzyZS8H1G31J6_3iLAwV-4miJo-cDJJJrOwROsQrZl3eJhJdstPvo54; __Host-next-auth.csrf-token=97070575efaadb156fee8355ecbf16ed4d48df9f42b377fce49a610e497a5b05%7C4bc81fafd8bab77784d251bc5bc42b39bb4fce6c22354ba4df990fd37e061990; __Secure-next-auth.callback-url=https%3A%2F%2Fchatgpt.com; _cfuvid=fwdvj_0TDwUh2kFwrJyYlS0zZgvOT5MOePEGOt9XWug-1739150334479-0.0.1.1-604800000; __cf_bm=Sv7F9gr7jOPNec3ML3J6Y3s0oM0CLxRy9.CxckdTfm4-1739151459-1.0.1.1-80_38SF1MjaZbgl01Ts3VJRxbQEkOoCICjOyikmQcD8U5r0oZizkDcuo56z6cjy_FkctTuBzxPIsDQhxM0BK3Q; cf_clearance=1CUIThyNq7ooffPyW1JmK8QH7xj2MLxmSl5L8LNKaP0-1739151521-1.2.1.1-xPOtFacn6BMOvjQYoPfBMhUuSx7jS2CFV_f8xJPoEGC0tADqABF7_AHe0dE1zRgOo0_e68_wouf_YN3h34GJxPXrzVmAtx8luVV8hZtW7H6cp4FzlMTXMvoNb._DdaswuwEuYqsZ6ohGu6OszCP7y7ZTlqxKmWs690IlEcOsNcQzP4pRje63i7_57vG8eh04JNYNUNhJKizAxhfSSpJ6lrU5XyGcnjwfL58xNA6iRq46pltOS.48LNAnvrt36mtxZ_PT4esjUV0JEqHnKX30ijVokD8WdTwuuJkSGwX5hNQ; __cfwaitingroom_chat=ChhHNk9QZkJJTVI0WlJQcUkrazZ1V0FBPT0SjAI5SmRueFQ2TllYT0g5ZkpDLzFCTGl3SVJQWDNncEdmZ0NFdXFFaUlZMkl5OGZjUzNsdkt2Tm04N0taVHVKYy9ib2JrWENZWWIxc3NDQmRhNHpoOTMzUkw0cWkwOXl3dzZ0bjRSam41enhtZFR0M2JROEFOUHNOVXFDRFdBNWFZcGVsaE9QaG05RHIxUzc3K3cwYmxGSEVMdng2WnVtNkd3WFMzVTdEZjZxVUhHQXd2ZmZIT2laVFVSUGM0eTNERWFNV0o1T1FaSmE4cytYUHI3eTI1aGJHYXMvV2FIcjFCWlBDN1hFc2V5OENzdUtlZklRMXQrdVRNbXVlYkR2T0tRaGxDbkphWkQ2UT09; oai-sc=0gAAAAABnqVkYol9GBQIPlfjtNp_4eh6JzbMt6_QzKj1Iu3qeeKBLkCQ5EPtTalv4_3AFyFZIU-s5cqLMpBhgPrZe50GH4FH_YB_rGjEAI5VL3I9EpJ2tliDrJKND83E1JP_Zf2Ri4Q2jl0Vr4VUcJ7z4mDAWpUlsuyr5tghwT76dU9lw896VUWX6qz24aK2mxUFZ8V9_lrrrztuV2XcJhpfyW_ORM87vJ9IVfPhn2eynzz5pMhjt-YI; __cflb=0H28vzvP5FJafnkHxj4bgCK5c5VwignHmfbW758uSiq; _dd_s=rum=0&expire=1739152548936&logs=1&id=9872e98f-9f7c-4311-bc8a-dfbe1defb7a9&created=1739151457784; __cf_bm=sxIx17b9xjAGWCHFr3_a6J29OS1bkmMunuJl5ydgr0c-1739152025-1.0.1.1-3SB.56hahV0uM85po03uZd8sCnso_DGCxqPTKDwOJODyfK5mBIUoBzLZ9MbQR9nE4Fjy44xal0aUJcQfzqctEw; __cflb=04dTofELUVCxHqRn2XSUf3gea9wBWCF71dVPNtsy3T', 
                'oai-device-id': '43aec8ad-68ef-489b-872a-c24181ff7569', 
                'oai-echo-logs': '0,1350,1,1663,0,1814,1,4635,0,6852,3,7697,1,11127,0,11364,1,11462', 
                'oai-language': 'en-US', 
                'openai-sentinel-chat-requirements-token': 'gAAAAABnqVkYjCdoTk5brOORLBiuqvUxrsS9a98bVYVQsfnNSsQd3SF1RdqcW1XlG-COLohw5JMrKwncHTIyNbB67fNJH2nN7FhFek30NbgOPcTM6HZqEFsRwb7TT-h7d8BGsqe5iE_vO6leASN9UXt0kiLGkeDCNyPpKkAYZH_EMt4VZlpjJsw4Hh7eBUGqO-CxOpX95yto9rotG2L21YFRVxSQRqSCGOXxzAFVQYSIF6nG3j9SuBi4WxcR3Va3bRCV9UDnktd6B6XdDVR8Qt6ZTLGEpUPZpPZV_APrRFg9j8uJpIYoPCfcL5U9tqAtsESUBxEIGFu26TNxyCiYNETfYrtXGtg81I1vGp5OSimvPRX8Qf-tikOuY2DHPdmPTl-oRyRmRmud5vgXrwkdDbOFkxnS8bZpZGCgYcK-dFGr060aYtVzSlnsGBWKz_qiehfJbi2ONT0J--aXF9UWDLOmt5hX5tDsBsyxXKxWzbR1S8p2ww_G6uB23EKqkwNMLRvhSo-ham9D4vKqFSFHDV7NMZsu-Ew8nbhUB7bNnBESZASCqwyqKUehan0nTsxfyNWujZV26V28R9aJvHuLxTE3gNw0HQ8ff4qbPiqXwqdkD1ksK_pX-SxRlQHmtjjuZu_MOcRipzPiDpAEN17DbOFx324Fh05L3jr7jkcTJ27vC3MitV_SQ_kfB-1UiccNaQQYWXazIrC_FiCnd9MDZbs3MZDavA7lqoVRi762z_PZMq589oUkova9jrx04wjeppfF0AzQj9W9HVvy4F96S840V6vt74vqivRZbuRYyTr9N6ukidqwqTyTHRjneG-gWsSb2HnIKXif7owBDuXlY53HDkd6rP1gq0gsPokAUuzrrohVFKV7UWNPlKy8attWz4KV1yRBU_h3hTZ0nsvr88cjfZ99xROnemAG1IZIcmWNUG2NlAAZdP8KE5dFK9VAhO96SvY-snfWH3_e66ZeE0WVUpawYYvyOqia9JJqg-UsFxNGWkDPzhR1QfkgnhFC5w80a70E_pu_KS6r-2pThRpr8eobLZyZ-xaK6f-SC-ybUOGr90bvk3al6exlctLTCorvbqm3uHwP_cVOW6AoAA5PyffperCp0PuJs85S8RZh5e73tGaUnDh7N35_E4Si8WdNTT4gA3kUhdevukBpbcadc4ZJTZFTYq5NxpOQdq53kzpPrbZnjFx-WgJvKnMhJ8JouWGwi3BMRN5zP96Zw5cv175l8-x6xG3HOhA3OhoA4xasY6FHeE9QkZpn9J_BTeC5UE6ST0lwzSI33g9hYzXr30TWZefoNg==', 
                'openai-sentinel-proof-token': 'gAAAAABWzMwMDAsIk1vbiBGZWIgMTAgMjAyNSAwODo0MDo0MCBHTVQrMDcwMCAoV2VzdGVybiBJbmRvbmVzaWEgVGltZSkiLDQyOTQ3MDUxNTIsNTgsIk1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzMi4wLjAuMCBTYWZhcmkvNTM3LjM2IEVkZy8xMzIuMC4wLjAiLCJjaHJvbWUtZXh0ZW5zaW9uOi8vbmltbG1lamJtbmVjbmFnaGdtYmFobWJhZGRoamJlY2cvY29udGVudC9sb2NhdGlvbi9sb2NhdGlvbi5qcyIsInByb2QtMjFjZmQ1MzYyMGIwMGFkOGMzNzkzN2MyOTk3ZjM1MjRhZTQ0ZGU3ZiIsImVuLVVTIiwiZW4tVVMsZW4saWQiLDgwLCJzZW5kQmVhY29u4oiSZnVuY3Rpb24gc2VuZEJlYWNvbigpIHsgW25hdGl2ZSBjb2RlXSB9IiwiX3JlYWN0TGlzdGVuaW5nbHJsaWQ5MnJ1OXEiLCJnZXRTZWxlY3Rpb24iLDMwOTEuNjAwMDAwMDAwMDkzLCI5ZWNhMjhhOC02NTZiLTQ3NzQtYjVkYy1mM2Y3YzYzOGJjYWQiLCIiLDIwLDE3MzkxNTE2Mzc3MTQuM10=', 
                'openai-sentinel-turnstile-token': 'TBQfChYGDwwDGnVeSVsaGxQZCRYFAgwDGnZ3b3h5dndveHl2d294eXZ3b3h5dndveHl2CxMbFBUPGRcAFQweFwEHBhYIAAYHHgsKAQYbDgsbFB8XAQYUFBt+YHx2am4GT3x/QGBlSQlvVWBGbm9hWk9+bUdleAlXbWVrb2JvWlZyaQYPYmpQX297eA16YEJ3bGRwbG5tW39hfG1HZXgJSGZgQnhvdGBeXF5cbEdvVG1ndghIem5ocGp1B15cXlxsR29UbWd2CEh6bmhwbRUaDA8AGQUMAxpvBmRYa2JFYH5pcVd7f2J0ZXtVdXBgeHtudVUTGxQVDxwXCwAUFBt6dgsTGxQVAhkXDRUMDGt9fWZ6bExSY397c2NwdGxpW05AYVR+d21OU3ZyVgl1c3d7eH5PYGJoCVNXfVV+ZnFrc2FkBmBJaQZsTWFUdX52f0BYZ0VdbW9kQm1vcV57aFRTV3t/XG1kf3NzY3B0emBhdEh+bmFmeVV6ZGNJe1tjWnRYbwZeY2FUW3d9UWFydGwBdHR3Fml/dl1jfghhV3l8QHJuHlJgZAdkf2BhdHZub1t+dmthcHJGUmhzdxp8f0BBYX4IYVd5fEBybh5SYGQGYGFscWBKWH4OfWhOU2d3fF52dmd7fX9ADntrfnlmfQhMUXFrAHZjc3hfbHJOY2FUW3d9UW5yYx9JdmJgQmtgZWB2b1QPcnZvfmNxRX9hYmRGYWBcWmJ+fl90S3wJc25DY2FkBXRvbGFOZ2gJeX1ICFxuZ0VNdFFwG39sYWB0YVRDen1Bam5gHlpvYGNKfmBlbHlucFNUem96BmAee2BvY3hAagdGTG4JU354fwlxUntzaW9gQnpdW3BlbFRTfU1/T1VhewBpcQd0fmBcWXZvflNTSHx6f24fQVtkBXR6eVpGXV1VfQ9NcQFYU0N/DlJuWkleYAcdY2BTRkh+XBxTZkkAVlhCCmFabFxgC1sOSH5cX3dJc1lhcBttaXIGeG9+W1V9CAlVYB9JW290Xn9rBkZlbFN+dXhVVFJxewByZHN/Y2lxbBtoU31xTHxMZGRpd1tkBnxha2FOGW59eXd6a2pyZ0UAdmQHG2t5ckZKa31hfnhVYlhuHlZgdFF3e35AWWB4T2Zvb3tpdnR8SVtvWmBvf1sOYm95bWZ2eHl4cUAITFJhYFViBANAXAtbQktxalhsdkkKVlh0QVkFbFxgC1NFSmEJWFAcVgUVGgwPDhkHHBsCFWQdUUJ6YxtJblxSZnRUcXh9YVxNYXtRSmBhYHppYwYXGxQVBR8XCw8UFBtpYnBsaG1xdH9sfnVne396ZmNoe2licGxobXF0f20IDhQCGwEFGBgPGg0UentqYHFZcHBwUVZ4f1AGfn55cmNobH5/bntBXnF0f3B8X11vfmlQd294dXRxH3trbwZCa2x1Y2NxT0BjaGxydWV8VnZzTkl7fnVga2sJAmd/QWlidW8NYnZ0RXB5dndqeFBDV3l8clZgQmxuc3RNe3tPRXtoVE9Tf0FpYnV7bAUVGgwNDBkGHBsCFWR7c2pkc2gNaWFgbXRCUA8MFRoDAQAMDBUMDHRBAwdheAUKFFM=', 
                'origin': 'https://chatgpt.com', 
                'priority': 'u=1, i', 
                'referer': 'https://chatgpt.com/', 
                'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Microsoft Edge";v="132"', 
                'sec-ch-ua-arch': '"x86"', 
                'sec-ch-ua-bitness': '"64"', 
                'sec-ch-ua-full-version': '"132.0.2957.140"', 
                'sec-ch-ua-full-version-list': '"Not A(Brand";v="8.0.0.0", "Chromium";v="132.0.6834.160", "Microsoft Edge";v="132.0.2957.140"', 
                'sec-ch-ua-mobile': '?0', 
                'sec-ch-ua-model': '""', 
                'sec-ch-ua-platform': '"Linux"', 
                'sec-ch-ua-platform-version': '"6.8.0"', 
                'sec-fetch-dest': 'empty', 
                'sec-fetch-mode': 'cors', 
                'sec-fetch-site': 'same-origin', 
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0'
            },
            data : data
        };

        return axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}