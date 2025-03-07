import axios from "axios";

export const SignAuth = axios.create({
    baseURL: "/proxy",
    headers: {
        'Content-Type':'application/json'
    }
});

export const signinTokenLogic = async({id, pw}) => {
    const data = {id, pw}
    const response = await SignAuth.post('/api/v1/auth/signin', data);
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