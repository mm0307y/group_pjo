import React, { useEffect, useRef } from "react";
import '@glidejs/glide/dist/css/glide.core.min.css';  // Glide의 스타일 import
import Glide from '@glidejs/glide';
import korea from "../../assets/여행지 이미지/한국/한복체험2.jpg"
import japan from "../../assets/여행지 이미지/일본/일본 전통.JPG"
import italian from "../../assets/여행지 이미지/이탈리아/17001230259406.png"
import thailand from "../../assets/여행지 이미지/태국/빨간연꽃연못톤부리시장문화체험.jpg"
import maldives from "../../assets/여행지 이미지/몰디브/img05.jpg"
import usa from "../../assets/여행지 이미지/미국/뉴욕해리포터빗자루체험.jpg"

const culturalExperiences = [
  {
    title: "한국 - 한복 체험",
    description: "한국의 전통 의상을 입어보세요",
    image: korea,
  },
  {
    title: "일본 - 다도 체험",
    description: "전통적인 일본 차 문화를 체험해보세요",
    image: japan,
  },
  {
    title: "이탈리아 요리 클래스",
    description: "전통 파스타 만들기를 배워보세요",
    image: italian,
  },
  {
    title: "태국 - 빨간 연꽃 연못 & 톤부리 시장 문화 체험",
    description: "아름다운 연꽃 연못에서 드론 촬영으로 잊을 수 없는 경험",
    image: thailand,
  },
  {
    title: "몰디브 - 돌핀 크루즈",
    description: "몰디브 전통 배 '도니(Dhoni)'를 타고 바다로 나가서 돌고래를 보는 크루즈 투어로, 아이를 동반한 가족분들에게 인기가 가장 좋은 익스커션 입니다.",
    image: maldives
  },
  {
    title: "미국 - 해리포터 빗자루 체험",
    description: "해리포터의 마법을 경험하고 뉴욕시의 상징적인 빗자루 체험을 통해 가상 호그와트를 날아보세요",
    image: usa
  },
];

const CulturalExperiences = () => {
  const glideRef = useRef(null);

  useEffect(() => {
    const glide = new Glide(glideRef.current, {
      type: 'carousel',
      perView: 3, // 한 번에 3개씩 보여줌
      gap: 20,    // 슬라이드 간 간격
      focusAt: 'center', // 중앙에 포커스를 맞추기
      animationDuration: 500, // 애니메이션 지속 시간
      breakpoints: {
        640: { perView: 1 },  // 화면이 640px 이하일 때는 한 개씩만 보여줌
        768: { perView: 2 },  // 화면이 768px 이하일 때는 두 개씩 보여줌
      }
    });

    glide.mount(); // Glide.js 슬라이더 초기화
    return () => glide.destroy(); // 컴포넌트 언마운트 시 Glide 제거
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">추천 문화 체험</h2>
        <div ref={glideRef} className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {culturalExperiences.map((experience, index) => (
                <li key={index} className="glide__slide">
                  <div className="rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{experience.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{experience.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 슬라이드 네비게이션 버튼 */}
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
            {culturalExperiences.map((_, index) => (
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

export default CulturalExperiences;
