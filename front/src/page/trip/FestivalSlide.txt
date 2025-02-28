import React from "react";

const FestivalSlide = ({ title, location, image }) => {
  return (
    <div className="rounded-lg overflow-hidden">
      {/* 축제 이미지 */}
      <img src={image} className="w-full h-80 object-cover" alt={title} />

      {/* 축제 정보 */}
      <div className="p-4 bg-white">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600">{location}</p>
      </div>
    </div>
  );
};

export default FestivalSlide;
