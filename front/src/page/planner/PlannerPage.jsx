import React from 'react'
import MainContent from './MainContent'
import TravelPlan from './TravelPlan'
import TravelRoute from './TravelRoute'

const PlannerPage = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 메인 소개 섹션 */}
      <MainContent />

      {/* 그리드 레이아웃 적용 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 왼쪽 (여행 폼 + 일정) */}
        <div className="space-y-8">
          <TravelPlan />
        </div>

        {/* 오른쪽 (지도 + 추천 장소) */}
        <div className="space-y-8">
          <TravelRoute />
          {/* 여기에 추가적인 추천 장소 컴포넌트 넣기 가능 */}
        </div>
      </div>
    </div>
  )
}

export default PlannerPage
