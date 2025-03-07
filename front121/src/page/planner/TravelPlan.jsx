import React from "react";

const TravelPlan = () => {
  // 기본 회화 데이터
  const conversations = [
    { korean: "안녕하세요", japanese: "こんにちは (konnichiwa)", description: "기본적인 인사말" },
    { korean: "감사합니다", japanese: "ありがとうございます (arigatou gozaimasu)", description: "감사 인사" },
    { korean: "실례합니다", japanese: "すみません (sumimasen)", description: "양해를 구할 때 사용" },
  ];

  // 추천 일정 데이터
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
      {/* 기본 회화 섹션 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">기본 회화</h2>
        <div className="space-y-4">
          {conversations.map((conv, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-1">
                <p className="font-medium">{conv.korean} / {conv.japanese}</p>
                <p className="text-sm text-gray-600">{conv.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 추천 일정 섹션 */}
      <h2 className="text-xl font-semibold mb-6">추천 일정</h2>

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

export default TravelPlan;
