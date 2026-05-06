import { useState, useRef, useEffect } from "react";
import DropdownIcon from "../../assets/icon/dropdown-icon.svg?react";
import "./Dropdown.css";

export default function Dropdown({ label, options, selected, onSelect }) {
  // 드롭다운 열림/닫힘 상태
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 영역을 감지하기 위한 ref
  const dropdownRef = useRef(null);

  // 드롭다운 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 사라질 때 이벤트 제거
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {/* 선택된 옵션이 있으면 그걸 보여주고, 없으면 기본 라벨 표시 */}
        {selected || label}
        <DropdownIcon className="dropdown__arrow" />
      </button>

      {/* isOpen이 true일 때만 메뉴 렌더링 */}
      {isOpen && (
        <div className="dropdown__menu">
          {/* 옵션 배열을 순회하며 버튼 생성, 선택된 옵션이면 selected 클래스 추가 */}
          {options.map((option) => (
            <button
              key={option}
              className={`dropdown__item ${selected === option ? "dropdown__item--selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
