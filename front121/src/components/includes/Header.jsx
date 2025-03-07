import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [userId, setUserId] = useState(""); // 로그인한 사용자 아이디
  const [shouldHideAuthButtons, setShouldHideAuthButtons] = useState(false); // 로그인/회원가입 버튼 숨기기 상태
  const navigate = useNavigate(); // 네비게이션 훅 사용
  const location = useLocation(); // 현재 경로 확인

  useEffect(() => {
    // 뒤로 가기 또는 앞으로 가기 했을 때 홈페이지면 새로고침
    const handlePopState = () => {
      if (window.location.pathname === "/", "/course", "/community", "/login", "/find-id", "/find-pw", "/signup") {
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
    const hideButtons = ["/login", "/find-id", "/find-pw", "/signup"].includes(location.pathname);
    setShouldHideAuthButtons(hideButtons); // 페이지 경로에 따라 버튼 숨김 상태를 설정
  }, [location.pathname]); // pathname이 변경될 때마다 실행

  // 로그인 버튼 클릭 시 실행될 함수
  const handleLoginClick = () => {
    setIsLoggedIn(true); // 로그인 상태로 변경
    setUserId("user123"); // 로그인한 사용자 아이디 설정
    window.location.href = "/login"; // 새로고침되면서 로그인 페이지로 이동
  };

  // 회원가입 버튼 클릭 시 실행될 함수
  const handleSignUpClick = () => {
    window.location.href = "/signup"; // 새로고침되면서 회원가입 페이지로 이동
  };

  // 로그아웃 버튼 클릭 시 실행될 함수
  const handleLogoutClick = () => {
    setIsLoggedIn(false); // 로그아웃 상태로 변경
    setUserId(""); // 사용자 아이디 초기화
    window.location.href = "/"; // 새로고침되면서 홈페이지로 이동
  };

  // 마이페이지로 이동
  const handleMyPageClick = () => {
    window.location.href = "/mypage"; // 새로고침되면서 마이페이지로 이동
  };

  return (
    <header className="bg-white shadow-sm fixed w-full z-50 top-0 left-0 h-16">
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 왼쪽 - 로고 */}
          {/* 로고 (클릭하면 홈페이지로 이동 & 새로고침) */}
          <img
            className="h-14 w-auto cursor-pointer"
            src="/images/Yeoul_Logo.jpg"
            alt="로고"
            onClick={() => {
              window.location.href = "/"; // 새로고침하면서 홈페이지 이동
            }}
          />

          {/* 중앙 - 네비게이션 메뉴 */}
          <div className="flex space-x-8 text-gray-700 font-medium text-lg">
            <span
              className="cursor-pointer hover:text-custom"
              onClick={() => window.location.href = "/course"} // 새로고침되면서 코스 추천 이동
            >
              코스추천
            </span>
            <span
              className="cursor-pointer hover:text-custom"
              onClick={() => window.location.href = "/community"} // 새로고침되면서 커뮤니티 이동
            >
              커뮤니티
            </span>
          </div>

          {/* 오른쪽 - 로그인/회원가입 또는 사용자 아이디 및 로그아웃 */}
          <div className="flex items-center space-x-4 min-w-[160px]">  {/* 최소 너비 추가 */}
            {isLoggedIn ? (
              // 로그인 상태일 경우
              <>
                <span
                  onClick={handleMyPageClick} // 마이페이지로 이동
                  className="text-gray-600 hover:text-custom cursor-pointer"
                >
                  {userId}님
                </span>
                <button
                  onClick={handleLogoutClick} // 로그아웃 클릭 시
                  className="rounded-md bg-custom text-white px-4 py-2 text-sm"
                >
                  로그아웃
                </button>
              </>
            ) : !shouldHideAuthButtons ? (
              // 로그인 상태가 아니고, 로그인/회원가입 버튼을 숨기지 않은 경우
              <>
                <button
                  onClick={handleLoginClick} // 로그인 클릭 시
                  className="rounded-md text-gray-600 hover:text-custom px-3 py-2 text-sm"
                >
                  로그인
                </button>
                <button
                  onClick={handleSignUpClick} // 회원가입 클릭 시
                  className="rounded-md bg-custom text-white px-4 py-2 text-sm"
                >
                  회원가입
                </button>
              </>
            ) : (
              // ✅ 공간 유지를 위해 보이지 않는 버튼을 유지!
              <>
                <button className="invisible rounded-md px-3 py-2 text-sm">로그인</button>
                <button className="invisible rounded-md px-4 py-2 text-sm">회원가입</button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
