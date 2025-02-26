import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/includes/Header"; // 헤더 컴포넌트
import Footer from "./components/includes/Footer"; // 푸터 컴포넌트
import HomePage from "./page/trip/HomePage.jsx";
import PlannerPage from "./page/planner/PlannerPage.jsx";
import LoginPage from "./page/auth/LoginPage.jsx";
import MyPage from "./page/auth/MyPage.jsx";
import SignupPage from "./page/auth/SignupPage.jsx";
import FindPassword from "./page/auth/FindPassword.jsx";
import FindId from "./page/auth/FindId.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<HomePage />} />

        {/* 여행 일정 플래너 페이지 */}
        <Route path="/menu1" element={<PlannerPage />} />

        {/* 다른 메뉴 페이지 */}
        <Route path="/menu2" element={<div>메뉴 2 페이지</div>} />
        <Route path="/menu3" element={<div>메뉴 3 페이지</div>} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/find-pw" element={<FindPassword />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
