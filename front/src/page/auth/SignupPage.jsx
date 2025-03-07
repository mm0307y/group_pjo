import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/logic/userCreate";

const SignupPage = () => {
  const navigate = useNavigate();
  // 기존 코드의 UI 유지하면서, useState에 맞게 필드 추가
  const [tempUser, setTempUser] = useState({
    name: "",
    email: "",
    id: "",
    pw: "",
    confirmPw: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    agreeTerms: false,
    role: "USER"
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTempUser({
      ...tempUser,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 이메일 인증 버튼 클릭 시 (더미 기능 유지)
  const handleEmailVerification = () => {
    alert("이메일 인증 기능은 현재 개발 중입니다.");
  };

  // 아이디 중복 확인 버튼 클릭 시 (더미 기능 유지)
  const handleCheckUsername = () => {
    alert("아이디 중복 확인 기능은 현재 개발 중입니다.");
  };

  // 회원가입 요청 (수업시간 코드 적용)
  const join = async (e) => {
    e.preventDefault();
    
    if (tempUser.pw !== tempUser.confirmPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    
    if (!tempUser.agreeTerms) {
      alert("개인정보 수집 및 이용에 동의해야 합니다.");
      return;
    }

    try {
      await signUp({
        name: tempUser.name,  // 백엔드에서 username 필드를 사용하므로 id를 변환
        id: tempUser.id,  // 백엔드에서 username 필드를 사용하므로 id를 변환
        pw: tempUser.pw,
        email: tempUser.email,
        /* brith: tempUser.brith, */
        birth: `${tempUser.birthYear}-${tempUser.birthMonth}-${tempUser.birthDay}`,  // ✅ 수정된 부분
        role: tempUser.role
      });
      alert("회원가입이 완료되었습니다!");
      navigate("/"); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원 가입 오류:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  // 생년월일 옵션 동적 생성
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50 font-['Noto_Sans_KR'] flex justify-center items-center px-4">
      <div className="max-w-md w-full bg-white py-8 px-6 shadow-sm rounded-lg">
        <div className="text-center">
          <img
            src="/images/Yeoul_Logo.jpg"
            alt="로고"
            className="h-14 mx-auto cursor-pointer"
            onClick={() => (window.location.href = "/")}
          />
          <h2 className="text-2xl font-bold text-gray-900 mt-4">회원가입</h2>
          <p className="text-sm text-gray-600">여행 코스 추천 서비스에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={join} className="mt-6 space-y-4">
          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              name="name"
              value={tempUser.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom sm:text-sm"
              placeholder="이름을 입력해주세요"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">이메일</label>
            <div className="mt-1 flex">
              <input
                type="email"
                name="email"
                value={tempUser.email}
                onChange={handleChange}
                required
                className="flex-1 block w-full border-gray-300 rounded-l-md focus:ring-custom focus:border-custom sm:text-sm"
                placeholder="이메일을 입력해주세요"
              />
              <button type="button" onClick={handleEmailVerification} className="px-4 py-2 text-white bg-custom rounded-r-md hover:bg-custom/90">
                인증하기
              </button>
            </div>
          </div>

          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">아이디</label>
            <input
              type="text"
              name="id"
              value={tempUser.id}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom sm:text-sm"
              placeholder="아이디를 입력해주세요"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              name="pw"
              value={tempUser.pw}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom sm:text-sm"
              placeholder="비밀번호를 입력해주세요"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
            <input
              type="password"
              name="confirmPw"
              value={tempUser.confirmPw}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom sm:text-sm"
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </div>

          {/* 개인정보 동의 */}
          <div className="flex items-start">
            <input type="checkbox" name="agreeTerms" checked={tempUser.agreeTerms} onChange={handleChange} />
            <label className="ml-2 text-sm">개인정보 수집 및 이용에 동의합니다.</label>
          </div>

          {/* 가입 버튼 */}
          <button type="submit" className="w-full py-2 text-white bg-custom rounded-md hover:bg-custom/90">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
