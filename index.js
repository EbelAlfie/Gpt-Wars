const axios = require('axios');
let data = JSON.stringify({
  "external_id": "t-zssvBPlYLXR3PlMrzUhyu8h7p3vvUDWHwGybdWkKw",
  "lang": "en"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://neo.character.ai/character/v1/get_character_info',
  headers: { 
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
    'Cookie': 'AMP_39bbdcaee6=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjI0OWUwYzM1MS1iYTI3LTRhYmEtOWY1Yy1hZjI5ZDc3NTVhOWYlMjIlN0Q; __cf_bm=gxOVTYUeuaxZhJvtp7wKBKdyinwK._IQt0OAwTYdkmI-1748322192-1.0.1.1-aAQu4HwoJcOLlxaJ6XwzdgggJPXZlC5V_K219DAVQqOS2Tmmev7OWQXS4dgIzP.oMkOBGCOVFOjh6Pn_YBo0xIKlTwdIh7HYOXqGRZteNvc; _cfuvid=V5IrvkGSAZBOxlECecAeNN2KFRt4knJ5DgX2yQI_1tI-1748322283270-0.0.1.1-604800000; GCLB=CL7g_vDetpuOxQEQAw',
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
