import React from 'react'
import { Navigate } from 'react-router'
// http://localhost:3000/login
// http://localhost:3000/joinForm
//로그인 화면에 접근하거나 회원가입 화면에 접근하는 것은 인증이 없이도 가능해야 한다.
//그 나머지는 무조건 낚아채서 login화면으로 강제로 보낸다.
//권한이 있어? USER, ADMIN  -> 익명사용자 - 강제로 로그인 화면으로 리다이렉트 처리해야 함.
const AuthProvider = ({children}) => {//<HomePage /> or <NoticePage / > or <SchedulePage />
    const accessToken = localStorage.getItem("accessToken")
    //3항연산자 
    //JWT -> 로그인했을 때 - accessToken, refreshToken(토큰 연장하는 로직을 구현하기 위해서- 파기시간)
    const Token = accessToken ? JSON.stringify(accessToken):null
    const check = localStorage.getItem("check")
    const user = check ? JSON.stringify(check): null
    //return에 오는 코드들이 화면을 출력한다.
    if(!user){
        return <Navigate to="/" />
    }
    return children
}

export default AuthProvider