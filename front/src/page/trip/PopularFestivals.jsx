import React, { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import FestivalSlide from "./FestivalSlide"; // 개별 축제 카드 컴포넌트
import "@glidejs/glide/dist/css/glide.core.min.css"; // Glide 스타일 추가
import "@glidejs/glide/dist/css/glide.theme.min.css"; // 추가 스타일 (선택)

const festivalData = [
  {
    title: "리우 카니발",
    location: "브라질 리우데자네이루",
    image:
      "https://creatie.ai/ai/api/search-image?query=Rio%20Carnival%20celebration&width=600&height=400",
  },
  {
    title: "옥토버페스트",
    location: "독일 뮌헨",
    image:
      "https://creatie.ai/ai/api/search-image?query=Oktoberfest%20in%20Munich&width=600&height=400",
  },
  {
    title: "벚꽃 축제",
    location: "일본 교토",
    image:
      "https://creatie.ai/ai/api/search-image?query=Japanese%20cherry%20blossom%20festival&width=600&height=400",
  },
];

const PopularFestivals = () => {
  const glideRef = useRef(null);

  useEffect(() => {
    const glide = new Glide(glideRef.current, {
      type: "carousel",
      perView: 3, // 한 번에 하나의 축제만 보여줌
      focusAt: "center",
      gap: 20, // 슬라이드 간격
      breakpoints: {
        1024: { perView: 2 }, // 화면이 1024px 이하일 때 2개 표시
        768: { perView: 1 },  // 화면이 768px 이하일 때 1개 표시
      },
    });

    glide.mount(); // Glide 초기화
    return () => glide.destroy(); // 컴포넌트 언마운트 시 Glide 제거
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">인기 축제</h2>
        <div ref={glideRef} className="glide">
          {/* 슬라이드 트랙 */}
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {festivalData.map((festival, index) => (
                <li key={index} className="glide__slide">
                  <FestivalSlide
                    title={festival.title}
                    location={festival.location}
                    image={festival.image}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ 추가: 좌우 이동 버튼 */}
          <div className="glide__arrows" data-glide-el="controls">
            <button
              className="glide__arrow glide__arrow--left bg-black text-white p-2 rounded-full"
              data-glide-dir="<"
            >
              ◀
            </button>
            <button
              className="glide__arrow glide__arrow--right bg-black text-white p-2 rounded-full"
              data-glide-dir=">"
            >
              ▶
            </button>
          </div>

          {/* 슬라이드 네비게이션 (버튼) */}
          <div className="glide__bullets" data-glide-el="controls[nav]">
            {festivalData.map((_, index) => (
              <button
                key={index}
                className="glide__bullet"
                data-glide-dir={`=${index}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularFestivals;
