import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "10px",
};

const defaultCenter = {
  lat: 37.5665,
  lng: 126.978,
  zoom: 6,
};

const MainContent = () => {
  const [places, setPlaces] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelStyle, setTravelStyle] = useState("여유로운 관광");
  const [budget, setBudget] = useState("");
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const autocompleteRef = useRef(null);
  const mapAutocompleteRef = useRef(null);

  const formatBudget = (value) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue ? Number(numericValue).toLocaleString() : "";
  };

  const handleBudgetChange = (e) => {
    setBudget(formatBudget(e.target.value));
  };

  const onPlaceChanged = (autocompleteInstance) => {
    if (autocompleteInstance) {
      const place = autocompleteInstance.getPlace();
      if (place.geometry) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name,
        };
        setMapCenter({ lat: newLocation.lat, lng: newLocation.lng, zoom: 12 });
        setPlaces([...places, newLocation]);
      }
    }
  };

  const removeMarker = (index) => {
    setPlaces(places.filter((_, i) => i !== index));
  };

  return (
    <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow-sm">
          나만의 완벽한 여행 일정을 만들어보세요
        </h1>
        <p className="text-lg text-gray-600">
          AI가 당신의 선호도에 맞는 최적의 여행 일정을 제안해드립니다
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">여행 정보 입력</h2>
        <div className="space-y-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">여행 국가</label>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={["places"]}>
              <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={() => onPlaceChanged(autocompleteRef.current)}>
                <input
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">1인당 예산</label>
            <input
              type="text"
              placeholder="예산을 입력하세요"
              className="w-full border-gray-300 rounded-md focus:border-custom focus:ring-custom"
              value={budget}
              onChange={handleBudgetChange}
            />
          </div>
        </div>
      </div>

      {/* 🟢 지도 컴포넌트 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">추천 장소</h2>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={["places"]}>
          <Autocomplete onLoad={(autocomplete) => (mapAutocompleteRef.current = autocomplete)} onPlaceChanged={() => onPlaceChanged(mapAutocompleteRef.current)}>
            <input
              type="text"
              placeholder="지도에서 검색할 장소를 입력하세요"
              className="w-full border-gray-300 focus:border-custom focus:ring-custom rounded-md p-2 mb-4"
            />
          </Autocomplete>
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat: mapCenter.lat, lng: mapCenter.lng }} zoom={mapCenter.zoom}>
            {places.map((place, index) => (
              <Marker
                key={index}
                position={{ lat: place.lat, lng: place.lng }}
                title={place.name}
                onClick={() => removeMarker(index)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </main>
  );
};

export default MainContent;
