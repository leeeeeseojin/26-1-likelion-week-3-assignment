import { useState } from "react";
import { SearchIcon } from "../../assets/icon/icons";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  // 입력값 상태
  const [value, setValue] = useState("");

  // 엔터 입력 시 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder="검색어를 입력하세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {/* 돋보기 클릭 시 검색 실행 */}
      <img
        className="search-bar__icon"
        src={SearchIcon}
        alt="검색"
        onClick={() => onSearch(value)}
      />
    </div>
  );
}
