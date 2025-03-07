import axios from "axios"

// Axios 인스턴스 생성
export const AuthApi = axios.create({
    baseURL: "/proxy",
    headers: {
        "Content-Type" : "application/json"
    }
})

//refreshToken API 호출 
export const RefreshTokenAPI = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const data = {
        token: refreshToken
    }
    try {
        const response = await AuthApi.post("/api/v1/auth/refresh", data)
        return response;
    } catch (error) {
        throw error
    }
}

export const oracleLogin = async(user) => {
    //사용자가 입력한 값
    console.log(user)
    try {
        const response = await axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            //아래 경우에는 인증(토큰) 없이도 접근이 가능해야 한다. - 403발생하지 않도록 한다.
            //클래스 설계 - > MemberController,  AuthenticationController,  EmpController 
            //http://localhost:8000/api/v1/auth/signin - 로그인할 때
            //http://localhost:8000/api/v1/auth/join - 회원가입을 할 때
            url: `${process.env.REACT_APP_SPRING_IP}api/v1/auth/signin`,
            data: user,
        })//end of axios
        console.log(response)
        //LoginPage에서 로그인 버튼 누르면 호출되는 함수임 
        //axios사용하여 비동기 방식으로 Spring boot에 요청을 보냄.
        //스프링에서 처리한 결과를 받아서 localStorage에 담아야 하므로 반드시 리턴 할것.
        return response.data
    } catch (error) {
        console.error("로그인 요청 에러 :", error)
    }
}
export const oracleJoin = async(user) => {
        //사용자가 입력한 값
        console.log(user)
        try {
            const response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_SPRING_IP}api/v1/auth/signup`,
                data: user,
            })//end of axios
            console.log(response)
            return response.data
        } catch (error) {
            console.error("회원가입 요청 에러 :", error)
        }    
}