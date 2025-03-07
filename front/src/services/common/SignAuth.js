import axios from "axios";

    export const SignAuth = axios.create({
    baseURL: "/proxy",
    headers: {
        'Content-Type':'application/json'
    }
}); 

/* export const SignAuth = axios.create({
    baseURL: "http://localhost:7007",  // ✅ 백엔드 주소로 변경
    headers: {
        'Content-Type':'application/json'
    }
}); */


export const signinTokenLogic = async({user_id, user_pw}) => {
    const data = {user_id, user_pw}
    const response = await SignAuth.post('/api/v1/auth/signin', data);
    console.log(response)
    return response.data;
}

export const refreshTokenLogic = async() => {
    const refreshToken = localStorage.getItem("refreshToken")
    const data =  {
        token: refreshToken
    }
    try {
        const response = await SignAuth.post("/api/v1/auth/refresh", data)
        console.log(response.data)
        return response
    } catch (error) {
        console.error("에러 발생!!!!")
    }
}