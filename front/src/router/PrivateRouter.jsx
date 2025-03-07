import React from 'react'
import { Navigate } from 'react-router-dom';
// AppRouter에서 권한에 따라 필터링이 필요한 경우 이 파일을 경유하도록 설계를 변경함.
// props1 - role -> USER이거나 ADMIN 둘 중 하나
// props2 - children -> 필터링이 된 후 나갈 페이지 함수 호출 -> <NoticePage /> or <SchedulePage />
// 그러나 <HomePage />는 권한이  없이도 누구나 들어갈 수 있는 페이지이다.
// props3 - allowedRoles={["ADMIN", "USER"]}
const PrivateRouter = ({role, children, allowedRoles}) => {
    const userRole = role;
    if(allowedRoles.includes(userRole)){
        return children;//props
    }else{
        //허용되지 않는 경우. 예를 들어 로그인 페이지나 접근 제한 페이지로 리다이렉트 할 수 있다.
        return <Navigate to="/error" replace />;
    }
}

export default PrivateRouter