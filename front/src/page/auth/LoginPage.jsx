import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 정보:", { email, password, rememberMe });
    // 여기에 실제 로그인 API 호출 로직 추가 가능
  };

  const handleNavigate = (path) => {
    window.location.href = path; // 경로에 맞게 새로고침 후 이동
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://creatie.ai/ai/api/search-image?query=A stunning panoramic view of a serene beach paradise with crystal clear turquoise waters, white sandy shores, and lush tropical palm trees swaying in the gentle breeze.&width=1920&height=1080&orientation=landscape')" }}>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <img className="mx-auto h-12 w-auto cursor-pointer" src="/images/Yeoul_Logo.jpg" alt="Logo" onClick={() => handleNavigate("/")} />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">로그인</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">아이디</label>
              <input
                type="text"
                className="w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="아이디를 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">비밀번호</label>
              <input
                type="password"
                className="w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="ml-2 text-sm text-gray-700">로그인 상태 유지</label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500">
              로그인
            </button>
          </form>
          <div className="mt-6 text-center text-sm">
            <button
              onClick={() => handleNavigate("/signup")}
              className="text-blue-500 hover:underline"
            >
              회원가입
            </button> |
            <button
              onClick={() => handleNavigate("/find-id")}
              className="text-blue-500 hover:underline"
            >
              아이디 찾기
            </button> |
            <button
              onClick={() => handleNavigate("/find-pw")}
              className="text-blue-500 hover:underline"
            >
              비밀번호 찾기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
