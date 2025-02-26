import React from "react";

const festivalData = [
  {
    month: "1월",
    festivalCount: "4개의 축제",
    festivals: [
      {
        day: "1일",
        name: "신년 축제",
        location: "전 세계",
      },
    ],
  },
  {
    month: "2월",
    festivalCount: "3개의 축제",
    festivals: [
      {
        day: "15일",
        name: "베니스 카니발",
        location: "이탈리아 베니스",
      },
    ],
  },
  {
    month: "3월",
    festivalCount: "5개의 축제",
    festivals: [
      {
        day: "17일",
        name: "성 패트릭 데이",
        location: "아일랜드 더블린",
      },
    ],
  },
];

const FestivalCalendar = () => {
  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold mb-8">이달의 축제 캘린더</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {festivalData.map((monthData, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{monthData.month}</h3>
              <span className="text-custom">{monthData.festivalCount}</span>
            </div>
            <ul className="space-y-4">
              {monthData.festivals.map((festival, fIndex) => (
                <li key={fIndex} className="flex items-start">
                  <div className="flex-shrink-0 w-12 text-center">
                    <span className="text-sm font-medium">{festival.day}</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">{festival.name}</h4>
                    <p className="text-sm text-gray-600">{festival.location}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FestivalCalendar;
