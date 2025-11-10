import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale'; // 한국어 로케일 임포트

// DayPicker의 기본 클래스 이름에 Tailwind CSS 클래스를 매핑
const tailwindStyles = {
  // 캘린더 전체 컨테이너
  root: 'p-4 border border-gray-200 rounded-lg shadow-xl bg-white w-full max-w-sm mx-auto', 
  // 월별 뷰를 담는 컨테이너
  months: 'flex flex-col sm:flex-row space-x-0 sm:space-x-4',
  // 각 월의 헤더 (월 이름 + 탐색 버튼)
  caption: 'flex justify-between items-center mb-4 px-1 pt-1',
  caption_label: 'text-lg font-semibold text-gray-800',
  // 탐색 버튼
  nav: 'flex items-center space-x-1',
  nav_button: 'w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition',
  // 요일 헤더 (일, 월, 화...)
  head: 'flex justify-between mt-2 text-sm font-medium text-gray-500',
  head_cell: 'w-10 h-10 flex items-center justify-center',
  // 날짜 그리드
  grid: 'grid grid-cols-7 gap-y-1',
  // 각 날짜 셀 버튼
  day: 'w-10 h-10 flex items-center justify-center text-sm rounded-full transition-colors cursor-pointer',
  // 오늘 날짜
  day_today: 'border border-blue-500 text-blue-500 font-bold',
  // 선택된 날짜 (핵심 디자인)
  day_selected: 'bg-indigo-600 text-white hover:bg-indigo-700 font-bold',
  // 비활성화된 날짜 (2025~2027년 범위 밖)
  day_disabled: 'text-gray-300 pointer-events-none',
};

function TailwindCalendar() {
  // 캘린더 초기값을 2025년 1월 1일로 설정
  const initialDate = new Date(2025, 0, 1); 
  const [selectedDate, setSelectedDate] = useState(initialDate);
  
  // 캘린더 탐색 범위 설정 (2025년 1월 1일 ~ 2027년 12월 31일)
  const fromDate = new Date(2025, 0, 1);
  const toDate = new Date(2027, 11, 31);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">🗓️ 2025년 ~ 2027년 캘린더</h1>
      
      <DayPicker
        mode="single" // 단일 날짜 선택 모드
        selected={selectedDate}
        onSelect={setSelectedDate}
        defaultMonth={fromDate} // 캘린더 시작 월을 2025년 1월로 설정
        fromDate={fromDate} // 탐색 시작 연도 제한
        toDate={toDate}   // 탐색 종료 연도 제한
        locale={ko}       // 한국어 로케일 적용
        
        // Tailwind 클래스 주입
        classNames={tailwindStyles}
        
        // 날짜가 범위 밖에 있을 때 비활성화
        disabled={[
            { before: fromDate }, 
            { after: toDate }
        ]}
      />
      
      <p className="mt-4 text-gray-700">
        현재 선택된 날짜: **{selectedDate ? selectedDate.toLocaleDateString('ko-KR', { 
            year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' 
        }) : '날짜를 선택하세요'}**
      </p>
    </div>
  );
}

export default TailwindCalendar;