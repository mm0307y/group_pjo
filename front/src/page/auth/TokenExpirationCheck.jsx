import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { RefreshTokenAPI } from '../../services/authLogic';
//JWT 토큰의 만료 여부를 실시간 으로 확인하고 토큰 만료 임박시 사용자에게 연장 여부를
//확인하는 기능 구현
//jwtDecode - JWT토큰을 디코딩하여 payload에 담긴 정보를 추출한다음
//토큰의 만료 시간 확인
const TokenExpirationCheck = (token) => {
    //토큰이 만료되었는지 여부
    const [isTokenExpired, setlsTokenExpired] = useState(false);
    //사용자 응답 여부를 추적 하는 상태값
    const [isUserResponded, setlsUserResponded] = useState(false);
    //토큰 만료 여부 체크
    const [isCheck, setIsCheck] = useState(true)
    useEffect(() => {
        const checkToken = () => {
            //토큰이 존재하면 토큰 만료 상태값을 변경함.
            if(!token){
                setlsTokenExpired(true)
                return;
            }//end of if
            const decoded = jwtDecode(token)
            const currentTime = Date.now() / 1000 //현재 시간을 초단위로
            //토큰에서 가져온 만료시간 보다 현재 시간이 더 크면 토큰은 만료되었음.
            if(decoded.exp < currentTime){
                setlsTokenExpired(true)
            }
            //만료시간이 현재 시간 보다 크면 만료되지 않았음.
            else{
                setlsTokenExpired(false)
                //토큰 만료 시간 중 남은 시간 계산하기
                const remainTime = decoded.exp - currentTime
                console.log("만료까지 남은 시간 : "+remainTime)
                //토큰 만료 1분 전이고 사용자가 아직 응답하지 않았다면
                if(remainTime <= 60 && !isUserResponded){
                    setIsCheck(false)
                    const userAgreed = window.confirm("토큰을 연장하시겠습니까?")
                    setlsUserResponded(true)
                    //토큰 연장을 원하는 경우임.
                    if(userAgreed){
                        //사용자가 승인했다면 리프레쉬 토큰을 활용하여 엑세스 토큰 갱신
                        RefreshTokenAPI()
                        .then(response => {
                            localStorage.setItem("accessToken", response.data.accessToken)
                            localStorage.setItem("refressToken", response.data.refreshToken)
                            setlsUserResponded(false)
                        })
                        .catch((error) => {
                            setlsTokenExpired(true);
                            console.error("error" + error);
                        })
                    }//end of if
                }
            }
        }////end of checkToken

        if(isCheck === true){
            checkToken()
            console.log("토큰 만료" +isTokenExpired)
        }

        //주기적으로 토큰 만료 여부를 체크할 수 있습니다.
        const interval = setInterval(checkToken, 1000*30)
        return () => clearInterval(interval)
    },[token])
    return isTokenExpired
}

export default TokenExpirationCheck