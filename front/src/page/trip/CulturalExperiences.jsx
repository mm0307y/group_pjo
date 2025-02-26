import React from "react";

const culturalExperiences = [
  {
    title: "일본 다도 체험",
    description: "전통적인 일본 차 문화를 체험해보세요",
    image:
      "https://creatie.ai/ai/api/search-image?query=Traditional Japanese tea ceremony with detailed tea sets, tatami mats, and elegant kimono-clad participants in a serene traditional room&width=400&height=300&orientation=landscape&flag=725ffe15-ee73-4cc8-bd21-c59a729d5aa0",
  },
  {
    title: "한복 체험",
    description: "한국의 전통 의상을 입어보세요",
    image:
      "https://creatie.ai/ai/api/search-image?query=Korean traditional hanbok dress fitting experience in a historic palace setting with ornate architecture and beautiful gardens&width=400&height=300&orientation=landscape&flag=834ace46-fc42-445e-bbb1-149220f37746",
  },
  {
    title: "이탈리아 요리 클래스",
    description: "전통 파스타 만들기를 배워보세요",
    image:
      "https://creatie.ai/ai/api/search-image?query=Italian pasta making class in a rustic Tuscan kitchen with fresh ingredients and traditional cooking methods&width=400&height=300&orientation=landscape&flag=72c60dd1-174e-45c9-8fab-ccb5620bad97",
  },
  {
    title: "스페인 플라멩코",
    description: "정열적인 춤을 배워보세요",
    image:
      "https://creatie.ai/ai/api/search-image?query=Spanish flamenco dance lesson in a traditional Andalusian setting with ornate decorations and passionate performers&width=400&height=300&orientation=landscape&flag=d9cdcf97-84d7-43de-ac55-c5637edfb9e4",
  },
];

const CulturalExperiences = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">추천 문화 체험</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturalExperiences.map((experience, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-sm">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{experience.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{experience.description}</p>
                <button className="!rounded-button bg-custom text-white px-4 py-2 text-sm w-full">
                  자세히 보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturalExperiences;
