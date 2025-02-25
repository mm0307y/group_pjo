import React, { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css"; // Glide 스타일 추가
import "@glidejs/glide/dist/css/glide.theme.min.css"; // 추가 스타일 (선택)

const GlideCarousel = () => {
  const glideRef = useRef(null);

  useEffect(() => {
    const glide = new Glide(glideRef.current, {
      type: "carousel",
      perView: 3,
      focusAt: "center",
      breakpoints: {
        1024: { perView: 2 },
        768: { perView: 1 }
      }
    });

    glide.mount();

    return () => glide.destroy(); // 컴포넌트가 언마운트될 때 Glide 해제
  }, []);

  return (
    <div className="glide" ref={glideRef}>
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          <li className="glide__slide">Slide 1</li>
          <li className="glide__slide">Slide 2</li>
          <li className="glide__slide">Slide 3</li>
          <li className="glide__slide">Slide 4</li>
        </ul>
      </div>

      {/* 네비게이션 추가 (선택) */}
      <div className="glide__arrows" data-glide-el="controls">
        <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
          ◀
        </button>
        <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
          ▶
        </button>
      </div>
    </div>
  );
};

export default GlideCarousel;