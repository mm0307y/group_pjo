import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Header from "./components/includes/Header"; // 헤더 컴포넌트
import Footer from "./components/includes/Footer"; // 푸터 컴포넌트
import HomePage from "./page/trip/HomePage.jsx";
import PlannerPage from "./page/planner/PlannerPage.jsx"; // 코스추천 페이지
import LoginPage from "./page/auth/LoginPage.jsx";
import MyPage from "./page/auth/MyPage.jsx";
import SignupPage from "./page/auth/SignupPage.jsx";
import FindPassword from "./page/auth/FindPassword.jsx";
import FindId from "./page/auth/FindId.jsx";
import TravelPage from "./page/notice/TravelPage.jsx";
import TravelReviewForm from "./page/notice/TravelReviewForm.jsx";

const Layout = ({ children }) => {
  const location = useLocation(); // 현재 경로 가져오기

  // 헤더 & 푸터를 숨길 페이지 목록
  const hideHeaderFooterPages = ["/login", "/signup", "/find-id", "/find-pw"];

  // 현재 페이지가 목록에 포함되면 헤더 & 푸터 숨김
  const shouldHideHeaderFooter = hideHeaderFooterPages.includes(location.pathname);

  return (
    <div className="select-none">
      {!shouldHideHeaderFooter && <Header />}
      {children}
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <div className="select-none">
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<HomePage />} />

            {/* 여행 일정 플래너 페이지 */}
            <Route path="/course" element={<PlannerPage />} />

            {/* 게시판 페이지 */}
            <Route path="/community" element={<TravelPage />} />
            <Route path="/write" element={<TravelReviewForm />} />

            {/* 로그인 및 회원 관련 페이지 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/find-pw" element={<FindPassword />} />
            <Route path="/find-id" element={<FindId />} />
            <Route path="/mypage" element={<MyPage />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
