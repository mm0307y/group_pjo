import React from "react";

const TravelRoute = ({ places = [] }) => {

    // 수정 버튼 클릭 이벤트
    const handleEdit = () => {
      console.log("✏️ 일정 수정 버튼 클릭됨!");
    };

  // 코스 보여주기
  const itinerary = [
    {
      day: "Day 1",
      activities: [
        { time: "09:00", title: "🏰 명동 관광", description: "쇼핑과 현지 음식 체험" },
        { time: "14:00", title: "🏛️ 경복궁", description: "한국의 대표적인 고궁 관람" },
        { time: "18:00", title: "🌆 광화문 광장", description: "야경 감상 및 저녁 식사" },
      ],
    },
    {
      day: "Day 2",
      activities: [
        { time: "10:00", title: "🗼 남산서울타워", description: "서울 전경 감상" },
        { time: "15:00", title: "🌎 이태원", description: "다문화 거리 탐방" },
      ],
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-gray-100">
      {/* 🟢 추천 장소 섹션 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">추천 장소</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {places.length > 0 ? (
            places.map((place, index) => (
              <li key={index} className="font-medium">{place.name}</li>
            ))
          ) : (
            <p className="text-gray-500">추천할 장소가 없습니다.</p>
          )}
        </ul>
      </div>

      {/* 🟢 추천 일정 섹션 */}
      <h2 className="text-xl font-semibold mb-6">AI 코스</h2>
      <div className="flex justify-end mb-4">
        <button onClick={handleEdit} className="text-custom hover:text-custom-dark text-sm font-medium">
          ✏️ 수정하기
        </button>
      </div>

      <div className="space-y-6">
        {itinerary.map((dayPlan, index) => (
          <div key={index} className={`border-l-4 pl-4 ${index === 0 ? "border-custom" : "border-indigo-300"}`}>
            <h3 className="text-lg font-medium mb-2">{dayPlan.day}</h3>
            <div className="space-y-3">
              {dayPlan.activities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-20 text-sm text-gray-500">{activity.time}</div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelRoute;
