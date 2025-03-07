import axios from "axios";
import { appInterceptor  } from "../common/appInterceptor";

export const signUp = async(data) => {
    try {
        const response = await appInterceptor.post("api/v1/auth/signup", data)
        /* const response = await axios.post("http://localhost:7007/api/v1/auth/signup", data);  // ✅ 백엔드 주소로 변경 */
        return response.data
    } catch (error) {
        console.error("회원가입 에러 발생 : "+error)
        //throw error;        
    }
}