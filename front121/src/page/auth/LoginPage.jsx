import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios import
import { signinTokenLogic } from "../../service/common/SignAuth";

const LoginPage = () => {
  const [tempUser, setTempUser] = useState({
    id: "",
    pw: ""
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const changeUser = (e) => {
    const { id, value } = e.target;
    setTempUser((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const loginE = async (e) => {
    e.preventDefault();
    console.log("로그인 시도:", tempUser);
    try {
      const response = await signinTokenLogic(tempUser);
      console.log("서버 응답:", response);
      if (response?.accessToken) {
        localStorage.clear();
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("check", "Y");
        localStorage.setItem("role", response.role);
        localStorage.setItem("email", response.email);
        localStorage.setItem("name", response.username);
        localStorage.setItem("id", response.id);
        navigate("/");
      } else {
        console.error("로그인 실패: 응답 데이터 없음");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://creatie.ai/ai/api/search-image?query=A stunning panoramic view of a serene beach paradise with crystal clear turquoise waters, white sandy shores, and lush tropical palm trees swaying in the gentle breeze.&width=1920&height=1080&orientation=landscape')" }}>
      
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
          <img className="mx-auto h-12 w-auto cursor-pointer" src="/images/Yeoul_Logo.jpg" alt="Logo" onClick={() => navigate("/")}  /> {/* 홈으로 이동 */}
            <h2 className="mt-6 text-3xl font-bold text-gray-900">로그인</h2>
          </div>
          <form className="space-y-6" onSubmit={loginE}>
            <div>
              <label className="block text-sm font-medium text-gray-700">아이디</label>
              <input
                type="text"
                id="id"
                onChange={changeUser}
                className="w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">비밀번호</label>
              <input
                type="password"
                id="pw"
                onChange={changeUser}
                className="w-full border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 입력하세요"
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
            <button className="text-blue-500 hover:underline">
              회원가입
            </button> |
            <button className="text-blue-500 hover:underline">
              아이디 찾기
            </button> |
            <button className="text-blue-500 hover:underline">
              비밀번호 찾기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
