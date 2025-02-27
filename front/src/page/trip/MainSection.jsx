import React, { useState } from "react";
import mainImg from "../../assets/여행지 이미지/한국/한국여행지.jpg"

const MainSection = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    alert(`검색어: ${searchText}`); // 실제 검색 로직은 API 연결 필요
  };

  return (
    <main className="pt-16">
      <section className="relative bg-gray-900 h-[600px] overflow-hidden">
        {/* 배경 이미지 */}
        <img
          src={mainImg} // im
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="축제 배경"
        />

        {/* 메인 컨텐츠 */}
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">세계의 축제와 문화를 경험하세요</h1>
            <p className="text-xl mb-8">
              전 세계의 다양한 문화와 축제를 통해 특별한 여행을 계획해보세요
            </p>

            {/* 검색창 */}
            <div className="relative">
              <input
                type="text"
                placeholder="국가나 축제 이름을 검색하세요"
                className="rounded-md w-full py-4 px-6 text-gray-900 pr-12"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="rounded-md absolute right-2 top-1/2 transform -translate-y-1/2 bg-custom text-white p-2"
                onClick={handleSearch}
              >
                🔍
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainSection;