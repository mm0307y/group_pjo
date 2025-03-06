import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    agreeTerms: false,
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 이메일 인증 버튼 클릭 시
  const handleEmailVerification = () => {
    alert("이메일 인증 기능은 현재 개발 중입니다.");
  };

  // 아이디 중복 확인 버튼 클릭 시
  const handleCheckUsername = () => {
    alert("아이디 중복 확인 기능은 현재 개발 중입니다.");
  };

  // 회원가입 버튼 클릭 시
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!formData.agreeTerms) {
      alert("개인정보 수집 및 이용에 동의해야 합니다.");
      return;
    }
    console.log("회원가입 정보:", formData);
    alert("회원가입이 완료되었습니다!");
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
            src="/images/Yeoul_Logo.png"
            alt="로고"
            className="h-14 mx-auto cursor-pointer"
            onClick={() => (window.location.href = "/")} // 홈페이지 이동
          />
          <h2 className="text-2xl font-bold text-gray-900 mt-4">회원가입</h2>
          <p className="text-sm text-gray-600">여행 코스 추천 서비스에 오신 것을 환영합니다</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 block w-full border-gray-300 rounded-l-md focus:ring-custom focus:border-custom sm:text-sm"
                placeholder="이메일을 입력해주세요"
              />
              <button
                type="button"
                onClick={handleEmailVerification}
                className="px-4 py-2 text-white bg-orange-500 rounded-r-md"
              >
                인증하기
              </button>
            </div>
          </div>

          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">아이디</label>
            <div className="mt-1 flex">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="flex-1 block w-full border-gray-300 rounded-l-md focus:ring-custom focus:border-custom sm:text-sm"
                placeholder="아이디를 입력해주세요"
              />
              <button
                type="button"
                onClick={handleCheckUsername}
                className="px-4 py-2 text-white bg-orange-500 rounded-r-md "
              >
                중복확인
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom sm:text-sm"
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </div>

          {/* 생년월일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">생년월일</label>
            <div className="mt-1 flex space-x-2">
              <select name="birthYear" value={formData.birthYear} onChange={handleChange} required>
                <option value="">년도</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select name="birthMonth" value={formData.birthMonth} onChange={handleChange} required>
                <option value="">월</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select name="birthDay" value={formData.birthDay} onChange={handleChange} required>
                <option value="">일</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 개인정보 동의 */}
          <div className="flex items-start">
            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
            <label className="ml-2 text-sm">개인정보 수집 및 이용에 동의합니다.</label>
          </div>

          {/* 가입 버튼 */}
          <button type="submit" className="w-full py-2 text-white bg-orange-500 rounded-md ">
            가입하기
          </button>
        </form>
        <p className="mt-7 text-center text-sm text-gray-600">
          이미 계정이 있으신가요? 
          <Link to="/login" className="font-medium text-custom hover:text-orange-500">
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
