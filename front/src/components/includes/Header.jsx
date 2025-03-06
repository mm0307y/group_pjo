import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ resetSearch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [userId, setUserId] = useState(""); // 로그인한 사용자 아이디
  const [shouldHideAuthButtons, setShouldHideAuthButtons] = useState(false); // 로그인/회원가입 버튼 숨기기 상태
  const navigate = useNavigate(); // 네비게이션 훅 사용
  const location = useLocation(); // 현재 경로 확인

  useEffect(() => {
    // 뒤로 가기 이벤트 발생 시 특정 페이지에서만 새로고침
    const handlePopState = () => {
      const reloadPaths = ["/", "/course", "/community", "/login", "/find-id", "/find-pw", "/signup"];
      if (reloadPaths.includes(window.location.pathname)) {
        window.location.reload();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // 경로 변경 시 버튼 숨기기 상태 업데이트
  useEffect(() => {
    // 로그인, 아이디 찾기, 비밀번호 찾기, 회원가입 페이지에서는 버튼을 숨기기
    const authPages = ["/login", "/find-id", "/find-pw", "/signup"];
    setShouldHideAuthButtons(authPages.includes(location.pathname)); // 페이지 경로에 따라 버튼 숨김 상태를 설정
  }, [location.pathname]); // pathname이 변경될 때마다 실행

  // 페이지 이동 함수
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="bg-white shadow-sm fixed w-full z-50 top-0 left-0 h-16">
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 왼쪽 - 로고 */}
          <img
            className="h-14 w-auto cursor-pointer"
            src="/images/Yeoul_Logo.png"
            alt="로고"
            onClick={() => {
              resetSearch(); // ✅ 검색어 초기화
              navigate("/");
            }}
          />

          {/* 중앙 - 네비게이션 메뉴 */}
          <div className="flex space-x-8 text-gray-700 font-medium text-lg">
            <span
              className="cursor-pointer hover:text-custom"
              onClick={() => handleNavigation("/course")}
            >
              코스추천
            </span>
            <span
              className="cursor-pointer hover:text-custom"
              onClick={() => handleNavigation("/community")}
            >
              커뮤니티
            </span>
          </div>

          {/* 오른쪽 - 로그인/회원가입 또는 사용자 아이디 및 로그아웃 */}
          <div className="flex items-center space-x-4 min-w-[160px]">
            {isLoggedIn ? (
              // 로그인 상태일 경우
              <>
                <span
                  onClick={() => handleNavigation("/mypage")}
                  className="text-gray-600 hover:text-custom cursor-pointer"
                >
                  {userId}님
                </span>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserId("");
                    handleNavigation("/");
                  }}
                  className="rounded-md bg-custom text-white px-4 py-2 text-sm"
                >
                  로그아웃
                </button>
              </>
            ) : !shouldHideAuthButtons && (
              // 로그인 상태가 아니고, 로그인/회원가입 버튼을 숨기지 않은 경우
              <>
                <button
                  onClick={() => handleNavigation("/login")}
                  className="rounded-md text-gray-600 hover:text-custom px-3 py-2 text-sm"
                >
                  로그인
                </button>
                <button
                  onClick={() => handleNavigation("/signup")}
                  className="rounded-md bg-orange-500 text-white px-4 py-2 text-sm"
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
