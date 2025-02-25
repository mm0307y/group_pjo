import React from "react";
import Header from "./components/includes/Header"; // 헤더 컴포넌트
import MainSection from "./page/trip/MainSection"; // 메인 배너
import ContinentList from "./page/trip/ContinentList"; // 대륙별 여행지
import PopularFestivals from "./page/trip/PopularFestivals"; // 인기 축제 섹션
import FestivalSlide from "./page/trip/FestivalSlide.jsx"; // 축제 슬라이드
import FestivalCalendar from "./page/trip/FestivalCalendar"; // 캘린더 컴포넌트
import CulturalExperiences from "./page/trip/CulturalExperiences"; // 문화 체험 컴포넌트
import Footer from "./components/includes/Footer"; // 푸터 컴포넌트

const App = () => {
  return (
    <>
      <Header />
      <MainSection />
      <ContinentList />
      <PopularFestivals />
      <FestivalSlide />
      <FestivalCalendar />
      <CulturalExperiences />
      <Footer />
    </>
  );
};

export default App;
