import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

// 지도 컨테이너 스타일 설정
const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "10px",
};

// 기본 지도 중심 좌표 (서울)
const defaultCenter = {
  lat: 37.5665,
  lng: 126.978,
  zoom: 6,
};

const MainContent = () => {
  // 추천 장소 및 사용자 검색 장소 상태 관리
  const [places, setPlaces] = useState([]);
  const [userPlaces, setUserPlaces] = useState([]); // 사용자가 검색한 장소 저장
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelStyle, setTravelStyle] = useState("여유로운 관광");
  const [budget, setBudget] = useState("");
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  // Autocomplete 참조
  const budgetInputRef = useRef(null); // 🔹 input 요소 참조 생성
  const autocompleteRef = useRef(null);
  const mapAutocompleteRef = useRef(null);
  const countryInputRef = useRef(null);
  const mapInputRef = useRef(null);

  // 숫자를 천 단위 콤마 추가하는 함수
  const formatBudget = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 숫자를 천 단위 콤마 추가하는 함수
  const handleBudgetChange = (e) => {
    const input = e.target;
    let rawValue = input.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
    let selectionStart = input.selectionStart; // 기존 커서 위치 저장

    let prevFormatted = budget; // 이전 값 저장
    let prevCommaCount = (prevFormatted.match(/,/g) || []).length; // 이전 콤마 개수

    // 🔹 입력 타입 확인
    const inputType = e.nativeEvent.inputType;

    // 천 단위 콤마 적용
    let formattedValue = formatBudget(rawValue);
    let newCommaCount = (formattedValue.match(/,/g) || []).length; // 새로운 콤마 개수
    let commaDiff = newCommaCount - prevCommaCount;

    if (inputType === "deleteContentForward") {
      if (prevFormatted[selectionStart] === ",") {
        selectionStart++;
      }
    }

    // 🔹 마지막 숫자까지 정상적으로 지워지게 커서 위치 보정
    if (formattedValue.length < selectionStart) {
      selectionStart = formattedValue.length;
    } else {
      selectionStart += commaDiff;
    }

    setBudget(formattedValue); // 상태 업데이트

    // 🔹 상태 업데이트 후 커서 위치 복원
    requestAnimationFrame(() => {
      if (budgetInputRef.current) {
        budgetInputRef.current.setSelectionRange(selectionStart, selectionStart);
      }
    });
  };

  // 장소 변경 시 실행되는 함수
  const onPlaceChanged = (autocompleteInstance, inputRef, isUserSearch = false) => {
    if (autocompleteInstance) {
      const place = autocompleteInstance.getPlace();
      if (place.geometry) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name,
        };

        if (isUserSearch) {
          setUserPlaces([...userPlaces, newLocation]); // 사용자 검색 장소 추가
          setMapCenter((prev) => ({
            lat: newLocation.lat,
            lng: newLocation.lng,
            zoom: prev.zoom + 2, // 기존 줌보다 2단계 확대
          }));
        } else {
          setMapCenter({ lat: newLocation.lat, lng: newLocation.lng, zoom: 12 }); // 지도 중심 이동
          setPlaces([...places, newLocation]); // 추천 장소 추가
        }
        if (inputRef.current) {
          inputRef.current.value = ""; // 입력 필드 초기화
        }
      }
    }
  };


  // 마커 제거
  const removeMarker = (index, isUserSearch = false) => {
    if (isUserSearch) {
      setUserPlaces(userPlaces.filter((_, i) => i !== index));
    } else {
      setPlaces(places.filter((_, i) => i !== index));
    }
  };

  return (
    <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      {/* 헤더 섹션 */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow-sm">
          나만의 완벽한 여행 일정을 만들어보세요
        </h1>
        <p className="text-lg text-gray-600">
          AI가 당신의 선호도에 맞는 최적의 여행 일정을 제안해드립니다
        </p>
      </div>

      {/* 여행 정보 입력 섹션 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">여행 정보 입력</h2>
        <div className="space-y-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">여행 국가</label>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={["places"]}>
              <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={() => onPlaceChanged(autocompleteRef.current, countryInputRef)}>
                <input
                  ref={countryInputRef}
                  type="text"
                  placeholder="여행하고 싶은 나라를 입력하세요"
                  className="w-full border-gray-300 focus:border-custom focus:ring-custom rounded-md p-2"
                />
              </Autocomplete>
            </LoadScript>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">여행 기간</label>
            <div className="flex gap-4">
              <input
                type="date"
                className="flex-1 border-gray-300 rounded-md focus:border-custom focus:ring-custom"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="flex-1 border-gray-300 rounded-md focus:border-custom focus:ring-custom"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">여행 스타일</label>
            <select
              className="w-full border-gray-300 rounded-md focus:border-custom focus:ring-custom"
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
            >
              <option>여유로운 관광</option>
              <option>체험 중심</option>
              <option>맛집 탐방</option>
              <option>쇼핑 중심</option>
            </select>
          </div>

          {/* 🔵 1인당 예산 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">1인당 예산</label>
            <div className="relative">
              <input
                ref={budgetInputRef} // 🔹 ref 추가
                type="text"
                className="w-full border-gray-300 rounded-md focus:border-custom focus:ring-custom pr-10"
                placeholder="0 원"
                value={budget}
                onChange={handleBudgetChange}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 지도 컴포넌트 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">추천 장소</h2>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={["places"]}>
          <Autocomplete onLoad={(autocomplete) => (mapAutocompleteRef.current = autocomplete)} onPlaceChanged={() => onPlaceChanged(mapAutocompleteRef.current, mapInputRef, true)}>
            <input
              ref={ mapInputRef}
              type="text"
              placeholder="지도에서 검색할 장소를 입력하세요"
              className="w-full border-gray-300 focus:border-custom focus:ring-custom rounded-md p-2 mb-4"
            />
          </Autocomplete>
          {/* 구글 지도 표시 */}
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat: mapCenter.lat, lng: mapCenter.lng }} zoom={mapCenter.zoom}>
            {/* 추천 장소 마커 */}
            {places.map((place, index) => (
              <Marker
                key={index}
                position={{ lat: place.lat, lng: place.lng }}
                title={place.name}
                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
                onClick={() => removeMarker(index)}
              />
            ))}
            {/* 사용자 검색 장소 마커 */}
            {userPlaces.map((place, index) => (
              <Marker
                key={index}
                position={{ lat: place.lat, lng: place.lng }}
                title={place.name}
                icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
                onClick={() => removeMarker(index, true)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </main>
  );
};

export default MainContent;
