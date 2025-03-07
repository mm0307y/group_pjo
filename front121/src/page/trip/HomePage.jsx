import React from "react";
import MainSection from "./MainSection"; // 메인 배너
import ContinentList from "./ContinentList"; // 대륙별 여행지
import PopularFestivals from "./PopularFestivals"; // 인기 축제 섹션
import FestivalCalendar from "./FestivalCalendar"; // 캘린더 컴포넌트
import CulturalExperiences from "./CulturalExperiences"; // 문화 체험 컴포넌트

const HomePage = () => {
  return (
    <>
      <MainSection />
      <ContinentList />
      <PopularFestivals />
      <FestivalCalendar />
      <CulturalExperiences />
    </>
  )
}

export default HomePage