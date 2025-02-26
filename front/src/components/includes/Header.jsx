import React, { useState } from "react";

const Header = () => {
  const [language, setLanguage] = useState("한국어");

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 로고 */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://ai-public.creatie.ai/gen_page/logo_placeholder.png"
                alt="로고"
              />
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex items-center space-x-4">
            <button className="rounded-md text-gray-600 hover:text-custom px-3 py-2 text-sm">
              로그인
            </button>
            <button className="rounded-md bg-custom text-white px-4 py-2 text-sm">
              회원가입
            </button>

            {/* 언어 선택 */}
            <select
              className="rounded-md border border-gray-300 text-sm px-3 py-2"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="한국어">한국어</option>
              <option value="English">English</option>
              <option value="日本語">日本語</option>
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
