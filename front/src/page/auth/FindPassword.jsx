import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가

const FindPassword = () => {
  const [userId, setUserId] = useState(""); // 아이디 상태
  const [email, setEmail] = useState(""); // 이메일 상태
  const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 상태

  const navigate = useNavigate(); // useNavigate 훅 사용

  // 입력값 변화에 따른 유효성 검사
  const validateForm = () => {
    const isValid = userId.trim() !== "" && email.trim() !== "";
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm(); // 입력값이 변할 때마다 유효성 검사
  }, [userId, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert("비밀번호 찾기 요청이 전송되었습니다.");
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  const handleNavigateToFindId = () => {
    navigate("/find-id"); // 아이디 찾기 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-['Noto_Sans_KR']">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
              alt="Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              비밀번호 찾기
            </h2>
            <p className="mt-4 text-center text-sm text-gray-600">
              가입 시 등록한 아이디와 이메일을 입력해주세요.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="user-id"
                  className="block text-sm font-medium text-gray-700"
                >
                  아이디
                </label>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <i className="fas fa-user"></i>
                  </span>
                  <input
                    id="user-id"
                    name="user-id"
                    type="text"
                    required
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="!rounded-button block w-full pl-10 py-3 border border-gray-300 focus:ring-custom focus:border-custom"
                    placeholder="아이디를 입력하세요"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  이메일
                </label>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="!rounded-button block w-full pl-10 py-3 border border-gray-300 focus:ring-custom focus:border-custom"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`!rounded-button group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white ${
                  isFormValid
                    ? "bg-custom hover:bg-custom/90"
                    : "bg-gray-400 cursor-not-allowed"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom`}
              >
                비밀번호 찾기
              </button>
            </div>

            <div className="flex items-center justify-center space-x-4 text-sm">
              <button
                onClick={handleNavigateToFindId} // 아이디 찾기 페이지로 이동
                className="text-custom hover:text-custom/90"
              >
                아이디 찾기
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={handleNavigateToLogin} // 로그인 페이지로 이동
                className="text-custom hover:text-custom/90"
              >
                로그인으로 돌아가기
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500">
        <p>&copy; 2024 All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FindPassword;
