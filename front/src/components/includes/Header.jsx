import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const [userId, setUserId] = useState(""); // 로그인한 사용자 아이디
  const [shouldHideAuthButtons, setShouldHideAuthButtons] = useState(false); // 로그인/회원가입 버튼 숨기기 상태
  const navigate = useNavigate(); // 네비게이션 훅 사용
  const location = useLocation(); // 현재 경로 확인

  // 경로 변경 시 버튼 숨기기 상태 업데이트
  useEffect(() => {
    // 로그인, 아이디 찾기, 비밀번호 찾기, 회원가입 페이지에서는 버튼을 숨기기
    const hideButtons = [
      "/login",
      "/find-id",
      "/find-pw",
      "/signup"
    ].includes(location.pathname);

    setShouldHideAuthButtons(hideButtons); // 페이지 경로에 따라 버튼 숨김 상태를 설정
  }, [location.pathname]); // pathname이 변경될 때마다 실행

  // 메뉴 클릭 시 실행될 함수
  const handleMenuClick = (path) => {
    setIsMenuOpen(false); // 메뉴 닫기
    navigate(path); // 해당 경로로 이동
  };

  // 로그인 버튼 클릭 시 실행될 함수
  const handleLoginClick = () => {
    setIsLoggedIn(true); // 로그인 상태로 변경
    setUserId("user123"); // 로그인한 사용자 아이디 설정
    navigate("/login"); // 로그인 페이지로 이동
  };

  // 회원가입 버튼 클릭 시 실행될 함수
  const handleSignUpClick = () => {
    navigate("/signup"); // 회원가입 페이지로 이동
  };

  // 로그아웃 버튼 클릭 시 실행될 함수
  const handleLogoutClick = () => {
    setIsLoggedIn(false); // 로그아웃 상태로 변경
    setUserId(""); // 사용자 아이디 초기화
    navigate("/"); // 홈페이지로 이동
  };

  // 마이페이지로 이동
  const handleMyPageClick = () => {
    navigate("/mypage"); // 마이페이지로 이동
  };

  return (
    <header className="bg-white shadow-sm fixed w-full z-50 top-0 left-0 h-16">
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 왼쪽 - 로고 + 햄버거 버튼 */}
          <div className="flex items-center">
            {/* 로고 (클릭하면 홈페이지로 이동) */}
            <img
              className="h-8 w-auto cursor-pointer"
              src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
              alt="로고"
              onClick={() => navigate("/")} // 로고 클릭 시 "/"로 이동
            />

            {/* 햄버거 버튼 (로고 옆에 위치, 적당한 간격 추가) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* 햄버거 메뉴 - 드롭다운 */}
          {isMenuOpen && (
            <div className="absolute top-16 left-10 bg-white shadow-lg rounded-md p-4 w-48">
              <ul className="flex flex-col space-y-2">
                <li>
                  <button
                    onClick={() => handleMenuClick("/menu1")}
                    className="text-gray-600 hover:text-custom w-full text-left px-3 py-2 text-sm"
                  >
                    코스추천
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleMenuClick("/menu2")}
                    className="text-gray-600 hover:text-custom w-full text-left px-3 py-2 text-sm"
                  >
                    국가
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleMenuClick("/menu3")}
                    className="text-gray-600 hover:text-custom w-full text-left px-3 py-2 text-sm"
                  >
                    축제
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleMenuClick("/menu3")}
                    className="text-gray-600 hover:text-custom w-full text-left px-3 py-2 text-sm"
                  >
                    문화
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleMenuClick("/menu3")}
                    className="text-gray-600 hover:text-custom w-full text-left px-3 py-2 text-sm"
                  >
                    커뮤니티
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* 오른쪽 - 로그인/회원가입 또는 사용자 아이디 및 로그아웃 */}
          <div className="flex items-center space-x-4">
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
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
