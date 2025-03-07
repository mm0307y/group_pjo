import axios from "axios";
import { useNavigate } from "react-router-dom";

//axios.create를 사용하여 새로운 axios의 인스턴스를 생성함.
//모든 API요청에 대해서 기본 URL을 /proxy로 설정하여, 실제 요청시 이 경로가 접두어로 붙게 됨.
//인터셉터 코드는 ERP 같은 대규모 어플리케이션에서 API호출 시 공통 인증 및 에러 처리를 
//일원화 하는데 좋은 패턴임.
//특히 프론트 엔드와 백엔드(Spring, Python AI 서비스) 간의 통신에서 보안과 안정성을
//유지하는데 중요한 역할을 함.
export const appInterceptor = axios.create({
    baseURL: "/proxy/",
});


// 요청 인터셉터 추가하기
//토큰 관리 : API요청 전에 localStorage에서 accessToken 가져와
//요청 헤더에 Authorization 필드로 추가함.
//에러 처리 - 요청 중에 에러 발생하면 Promise.reject 호출
appInterceptor.interceptors.request.use(
    config => {
        // 요청이 전달되기 전에 작업 수행
        const token = localStorage.getItem("accessToken")
        if(token) {
            //헤더에 토큰 추가함.
            config.headers["Authorization"] = "Bearer " + token
        }
        return config;
    }, (error) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
});

// 응답 인터셉터 추가하기
// 성공적인 응답인 경우 - 응답 객체를 그대로 넘김
// 에러 응답 처리
// 401(Unauthorized) - 인증 실패시 
// 403(Forbiden) or 500(서버 에러 - Exception) - 권한 부족하다.
appInterceptor.interceptors.response.use( 
    response => {
        //응답이 성공이면
        return response;
    }, 
    error => {
        const navigation = useNavigate();
        if(error.response){
            switch(error.response.status){
                case 401: //인증 실패(토큰 만료인 경우 - 재로그인)
                    console.log("인증 실패하였습니다. 재로그인 해주세요.")
                    navigation("/") //로그인 페이지로 리다이텍트 함.
                    localStorage.removeItem("accessToken")
                    localStorage.removeItem("refreshToken")
                    localStorage.removeItem("check")
                    break;
                case 403:
                    console.log("접근 권한이 없습니다.")
                    break;
                case 500:
                    console.log("서버 오류. 관리자에게  확인하세요.")
                    break;
                default:
                    break;
            }//end of switch
        }//end of if
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
});



