import React, { useRef, useState } from "react";

const TravelReviewForm = () => {
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(""); // 총 금액 상태
  const [timeline, setTimeline] = useState([{ date: "", place: "", time: "", details: "" }]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(4);
  const [visibility, setVisibility] = useState("전체 공개");
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null); // input 요소 참조

  // 숫자에 천 단위 콤마 추가하는 함수
  const formatNumberWithCommas = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 총 금액 입력 핸들러
  const handleCostChange = (e) => {
    let rawValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기

    // 사용자가 모든 숫자를 삭제하면 빈 문자열 유지
    if (rawValue === "") {
      setTotalCost("");
    } else {
      setTotalCost(formatNumberWithCommas(rawValue)); // 천 단위 콤마 적용
    }
  };

  // 키보드 입력 핸들러 (백스페이스 & 딜리트)
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      let rawValue = totalCost.replace(/[^0-9]/g, ""); // 숫자만 추출

      if (rawValue.length === 1) {
        setTotalCost(""); // 숫자가 전부 지워지면 빈 값으로 설정
        e.preventDefault(); // 원만 남는 경우 기본 동작 방지
      }
    }
  };

  // 일정 추가
  const addTimeline = () => {
    setTimeline([...timeline, { date: "", place: "", time: "", details: "" }]);
  };

  // 일정 데이터 변경
  const handleTimelineChange = (index, key, value) => {
    const updatedTimeline = [...timeline];
    updatedTimeline[index][key] = value;
    setTimeline(updatedTimeline);
  };

  // 파일 선택
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("후기가 제출되었습니다!");
  };

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-lg font-medium leading-6 text-gray-900 mb-4">여행 후기 작성</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 제목 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">제목</label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-custom focus:border-custom"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 여행 정보 */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">여행지</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-custom focus:border-custom"
                  placeholder="여행지를 입력하세요"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">여행 기간</label>
                <div className="mt-1 flex space-x-2">
                  <input
                    type="date"
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-custom focus:border-custom"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    type="date"
                    className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-custom focus:border-custom"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">총 금액</label>
                <div className="relative">
                  <input
                    type="text"
                    ref={inputRef} // input 요소 참조
                    className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-custom focus:border-custom pr-10"
                    placeholder="0 원"
                    value={totalCost} // 항상 숫자만 표시
                    onChange={handleCostChange}
                    onKeyDown={handleKeyDown}
                  />
                  {/* '원'을 항상 표시하는 span */}
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
                </div>
              </div>
            </div>

            {/* 일정 타임라인 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">일정 타임라인</label>
              <div className="mt-2 space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-custom text-white px-2 py-1 rounded text-sm">Day {index + 1}</span>
                      <input
                        type="date"
                        className="border-gray-300 rounded-lg shadow-sm focus:ring-custom focus:border-custom"
                        value={item.date}
                        onChange={(e) => handleTimelineChange(index, "date", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        className="border-gray-300 rounded-lg shadow-sm focus:ring-custom focus:border-custom"
                        placeholder="장소"
                        value={item.place}
                        onChange={(e) => handleTimelineChange(index, "place", e.target.value)}
                      />
                      <input
                        type="text"
                        className="border-gray-300 rounded-lg shadow-sm focus:ring-custom focus:border-custom"
                        placeholder="시간"
                        value={item.time}
                        onChange={(e) => handleTimelineChange(index, "time", e.target.value)}
                      />
                    </div>
                    <textarea
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-custom focus:border-custom"
                      rows="2"
                      placeholder="상세 내용"
                      value={item.details}
                      onChange={(e) => handleTimelineChange(index, "details", e.target.value)}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTimeline}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-custom hover:text-custom"
                >
                  + 일정 추가
                </button>
              </div>
            </div>

            {/* 여행 후기 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">여행 후기</label>
              <textarea
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-custom focus:border-custom"
                rows="4"
                placeholder="전반적인 여행 후기를 작성해주세요"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>

            {/* 파일 업로드 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">사진 및 동영상 첨부</label>
              <input type="file" multiple onChange={handleFileChange} className="mt-2 block w-full" />
            </div>

            {/* 공개 설정 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">공개 설정</label>
              <select
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-custom focus:border-custom"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option>전체 공개</option>
                <option>내꺼</option>
              </select>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-3">
              <button type="button" className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 text-sm font-medium">
                취소
              </button>
              <button type="submit" className="bg-custom text-white rounded-lg px-4 py-2 text-sm font-medium">
                등록하기
              </button>
            </div>
          </form>
        </div>
      </div >
    </main >
  );
};

export default TravelReviewForm;
