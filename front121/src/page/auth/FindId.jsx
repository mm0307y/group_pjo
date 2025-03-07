import React, { useState } from "react";

const FindId = () => {
  // 입력값과 결과 메시지 상태 관리
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isResultVisible, setIsResultVisible] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 제출 동작 방지
    setIsResultVisible(true); // 결과 메시지 표시
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-gray-50 font-['Noto_Sans_KR']">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-sm">
        {/* 로고 및 제목 */}
        <div className="text-center">
          {/* 로고 클릭 시 홈페이지로 이동 */}
          <img
            className="mx-auto h-12 w-auto mb-8 cursor-pointer"
            src="/images/Yeoul_Logo.jpg"
            alt="Logo"
            onClick={() => (window.location.href = "/")} // 홈페이지 이동
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">아이디 찾기</h2>
          <p className="text-sm text-gray-600">
            가입 시 등록한 이메일로 아이디를 찾을 수 있습니다.
          </p>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-5">
            {/* 이름 입력 필드 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                이름
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="!rounded-button appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-custom focus:border-custom text-sm"
                  placeholder="이름을 입력해주세요"
                />
              </div>
            </div>

            {/* 이메일 입력 필드 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="!rounded-button appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-custom focus:border-custom text-sm"
                  placeholder="이메일을 입력해주세요"
                />
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="space-y-3">
            <button
              type="submit"
              className="!rounded-button group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium text-white bg-custom hover:bg-custom/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom"
            >
              아이디 찾기
            </button>
            {/* 로그인 페이지로 이동하는 버튼 */}
            <button
              type="button"
              onClick={() => (window.location.href = "/login")} // 로그인 페이지 이동
              className="!rounded-button block w-full text-center py-2.5 px-4 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom"
            >
              로그인으로 돌아가기
            </button>
          </div>
        </form>

        {/* 결과 메시지 (조건부 렌더링) */}
        {isResultVisible && (
          <div id="result" className="mt-4 p-4 rounded-lg bg-blue-50 text-blue-700 text-sm">
            <p className="flex items-center">
              <i className="fas fa-info-circle mr-2"></i>
              <span>입력하신 정보와 일치하는 아이디를 이메일로 발송했습니다.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindId;
