import React, { useState } from "react";

// 임시 일정 데이터 생성
const dummySchedules = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `일정 제목 ${i + 1}`,
  content: `일정 내용 ${i + 1}`,
  date: new Date(2025, 10, (i % 30) + 1),
  shared: i % 3 === 0,
}));

const ITEMS_PER_PAGE = 10;

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const ScheduleCard = ({ schedule }) => (
  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "10px",
      marginBottom: "10px",
      background: "#f9f9f9",
    }}
  >
    <h3>{schedule.title}</h3>
    <p>{schedule.content}</p>
    <small>{formatDate(schedule.date)}</small>
    {schedule.shared && <span style={{ marginLeft: 10, color: "green" }}>공유</span>}
  </div>
);

const MenuTabs = ({ selectedTab, setSelectedTab }) => {
  const tabs = ["전체 일정", "이번 주 일정", "이번 달 일정", "공유 일정"];
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          style={{
            padding: "10px 20px",
            background: selectedTab === tab ? "#007bff" : "#e0e0e0",
            color: selectedTab === tab ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const SortSelector = ({ sortOption, setSortOption }) => (
  <div style={{ marginBottom: "10px" }}>
    <label>
      정렬:{" "}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="upcoming">곧 다가오는 일정순</option>
        <option value="latest">최신순</option>
      </select>
    </label>
  </div>
);

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div style={{ marginTop: "20px" }}>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => setCurrentPage(num)}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            background: currentPage === num ? "#007bff" : "#e0e0e0",
            color: currentPage === num ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

// 모달 컴포넌트
const ScheduleModal = ({ isOpen, onClose, onAdd }) => {
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    content: "",
    date: "",
    shared: false,
  });

  const handleSubmit = () => {
    if (!newSchedule.title || !newSchedule.date) {
      alert("제목과 날짜는 필수입니다!");
      return;
    }
    onAdd({
      ...newSchedule,
      id: Date.now(),
      date: new Date(newSchedule.date),
    });
    setNewSchedule({ title: "", content: "", date: "", shared: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <h2>새 일정 추가</h2>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="제목"
            value={newSchedule.title}
            onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            placeholder="내용"
            value={newSchedule.content}
            onChange={(e) => setNewSchedule({ ...newSchedule, content: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="date"
            value={newSchedule.date}
            onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={newSchedule.shared}
              onChange={(e) => setNewSchedule({ ...newSchedule, shared: e.target.checked })}
            />{" "}
            공유 일정
          </label>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{ padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: "8px 15px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

const SchedulePage = () => {
  const [schedules, setSchedules] = useState(dummySchedules);
  const [selectedTab, setSelectedTab] = useState("전체 일정");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date();

  // 필터링
  let filteredSchedules = schedules.filter((schedule) => {
    switch (selectedTab) {
      case "이번 주 일정":
        const oneWeekLater = new Date();
        oneWeekLater.setDate(today.getDate() + 7);
        return schedule.date >= today && schedule.date <= oneWeekLater;
      case "이번 달 일정":
        return (
          schedule.date.getFullYear() === today.getFullYear() &&
          schedule.date.getMonth() === today.getMonth()
        );
      case "공유 일정":
        return schedule.shared;
      case "전체 일정":
      default:
        return true;
    }
  });

  // 정렬
  filteredSchedules.sort((a, b) =>
    sortOption === "latest" ? b.date - a.date : a.date - b.date
  );

  // 페이지네이션
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedSchedules = filteredSchedules.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredSchedules.length / ITEMS_PER_PAGE);

  return (
    <div style={{ width: "600px", margin: "20px auto", fontFamily: "Arial" }}>
      {/* 일정 추가 버튼 */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          일정 추가
        </button>
      </div>

      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(newSchedule) => setSchedules([newSchedule, ...schedules])}
      />

      {/* 메뉴 탭 */}
      <MenuTabs
        selectedTab={selectedTab}
        setSelectedTab={(tab) => {
          setSelectedTab(tab);
          setCurrentPage(1);
        }}
      />

      {/* 정렬 선택 */}
      <SortSelector sortOption={sortOption} setSortOption={setSortOption} />

      {/* 일정 목록 */}
      <div style={{ minHeight: "400px" }}>
        {displayedSchedules.length > 0 ? (
          displayedSchedules.map((schedule) => (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          ))
        ) : (
          <p>일정이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default SchedulePage;
