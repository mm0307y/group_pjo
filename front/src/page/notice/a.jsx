import React, { useEffect, useState } from "react";

const places = [
  { id: 1, name: "성산일출봉", location: "제주도", image: "https://example.com/image1.jpg", rating: 4.5, reviews: 128 },
  { id: 2, name: "남산서울타워", location: "서울", image: "https://example.com/image2.jpg", rating: 4.0, reviews: 256 },
  { id: 3, name: "불국사", location: "경주", image: "https://example.com/image3.jpg", rating: 5.0, reviews: 198 },
  { id: 4, name: "해운대", location: "부산", image: "https://example.com/image4.jpg", rating: 4.2, reviews: 311 },
  { id: 5, name: "경복궁", location: "서울", image: "https://example.com/image5.jpg", rating: 4.7, reviews: 421 },
  { id: 6, name: "한라산", location: "제주도", image: "https://example.com/image6.jpg", rating: 4.6, reviews: 211 },
  { id: 7, name: "광안리", location: "부산", image: "https://example.com/image7.jpg", rating: 4.3, reviews: 189 },
  { id: 8, name: "설악산", location: "강원도", image: "https://example.com/image8.jpg", rating: 4.8, reviews: 237 },
  { id: 9, name: "전주 한옥마을", location: "전주", image: "https://example.com/image9.jpg", rating: 4.4, reviews: 320 },
  { id: 10, name: "대구 83타워", location: "대구", image: "https://example.com/image10.jpg", rating: 4.1, reviews: 142 }
];

const TravelPage = () => {
  const [selectedRegion, setSelectedRegion] = useState("전체 지역");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    try {
      const user = localStorage.getItem("userId");
      if (user) {
        setIsLoggedIn(true);
        setUserId(user);
      }
    } catch (error) {
      console.error("로컬 스토리지에서 데이터를 가져오는 중 오류 발생:", error);
    }
  }, []);

  // ✅ 필터링된 여행지 목록
  const filteredPlaces = places
    .filter((place) => selectedRegion === "전체 지역" || place.location.includes(selectedRegion))
    .filter((place) => place.name.includes(searchQuery));

  // ✅ 정렬된 데이터 반환
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (sortOrder === "인기순") return b.reviews - a.reviews;
    if (sortOrder === "별점순") return b.rating - a.rating;
    return b.id - a.id; // 최신순 (id 내림차순)
  });

  // ✅ 현재 페이지 데이터
  const paginatedPlaces = sortedPlaces.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(sortedPlaces.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      {/* 여행 필터 */}
      <div className="py-8 flex flex-wrap items-center justify-between gap-4">
        <select
          className="w-48 border-gray-300 rounded-md text-sm"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="전체 지역">전체 지역</option>
          <option value="서울">서울</option>
          <option value="부산">부산</option>
          <option value="제주">제주</option>
        </select>

        <input
          type="text"
          placeholder="여행지 검색"
          className="w-80 border-gray-300 rounded-md text-sm pl-3 py-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="w-32 border-gray-300 rounded-md text-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="최신순">최신순</option>
          <option value="인기순">인기순</option>
          <option value="별점순">별점순</option>
        </select>

        <button onClick={() => (window.location.href = "/write")} className="bg-custom text-white px-4 py-2 text-sm rounded-md">
          글쓰기
        </button>
      </div>

      {/* 여행지 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPlaces.map((place) => (
          <div key={place.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img src={place.image} className="w-full h-48 object-cover" alt={place.name} />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">{place.name}</h3>
              <p className="text-sm text-gray-600">{place.location}</p>
              <div className="flex items-center my-3 text-yellow-400">
                {Array.from({ length: 5 }, (_, i) => (
                  <i key={i} className={i < Math.floor(place.rating) ? "fas fa-star" : "far fa-star"}></i>
                ))}
                <span className="ml-2 text-sm text-gray-600">{place.rating} ({place.reviews}개 리뷰)</span>
              </div>
              <button className="w-full rounded-md bg-custom text-white py-2 text-sm font-medium">상세보기</button>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-6 flex justify-center">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-2 mx-1 border rounded-md text-sm bg-gray-100">
          이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-2 mx-1 border rounded-md text-sm ${currentPage === i + 1 ? "bg-blue-500 text-white" : "text-gray-700 bg-white"}`}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-2 mx-1 border rounded-md text-sm bg-gray-100">
          다음
        </button>
      </div>
    </div>
  );
};

export default TravelPage;
