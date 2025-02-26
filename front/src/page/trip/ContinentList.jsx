import React from "react";

const continents = [
  {
    name: "아시아",
    image:
      "https://creatie.ai/ai/api/search-image?query=Iconic Asian landmarks and cultural symbols including temples, cherry blossoms, and traditional architecture against a serene natural backdrop&width=400&height=300&orientation=landscape&flag=973c6964-e695-40c8-93b1-663ed75bd257",
  },
  {
    name: "유럽",
    image:
      "https://creatie.ai/ai/api/search-image?query=European cityscape featuring historic architecture, cobblestone streets, and iconic landmarks like the Eiffel Tower against a dramatic sky&width=400&height=300&orientation=landscape&flag=8b5c48e3-5398-4c54-b0db-9a847a7808fd",
  },
  {
    name: "북아메리카",
    image:
      "https://creatie.ai/ai/api/search-image?query=North American landscape showcasing modern cities, natural wonders like the Grand Canyon, and diverse cultural elements against a sunset sky&width=400&height=300&orientation=landscape&flag=d6d77818-e059-4577-ad08-249ba862cf6f",
  },
  {
    name: "남아메리카",
    image:
      "https://creatie.ai/ai/api/search-image?query=South American scenery featuring vibrant carnival celebrations, ancient Incan ruins, and lush Amazon rainforest against a dramatic mountain backdrop&width=400&height=300&orientation=landscape&flag=36a50012-64b1-4a56-b227-5c2b368d6c2d",
  },
  {
    name: "아프리카",
    image:
      "https://creatie.ai/ai/api/search-image?query=African landscape with traditional tribal celebrations, wildlife, and iconic savanna sunset featuring cultural elements and natural beauty&width=400&height=300&orientation=landscape&flag=f85b0a02-3f65-4385-9d4e-a8a8eeedab03",
  },
  {
    name: "오세아니아",
    image:
      "https://creatie.ai/ai/api/search-image?query=Oceania landscape featuring the Sydney Opera House, Aboriginal art, Pacific Island culture, and pristine beaches against a clear blue sky&width=400&height=300&orientation=landscape&flag=7bd7f254-8e77-43fd-a3ed-b3bcf0211e99",
  },
];

const ContinentList = () => {
  const handleClick = (continent) => {
    alert(`${continent} 여행지를 탐색하세요!`); // 이후 실제 네비게이션 추가 가능
  };

  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold mb-8">대륙별 여행지</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {continents.map((continent, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => handleClick(continent.name)}
          >
            <img src={continent.image} className="w-full h-48 object-cover" alt={continent.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <span className="text-white font-medium">{continent.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContinentList;
