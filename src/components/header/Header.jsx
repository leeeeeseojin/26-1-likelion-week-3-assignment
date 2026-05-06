import SearchBar from "../searchBar/SearchBar";
import "./Header.css";

export default function Header({ onSearch }) {
  return (
    <header className="header">
      <span className="header__logo">KWU LIKELION THEATER</span>
      <div className="header__search">
        <SearchBar onSearch={onSearch} />
      </div>

      <div className="header__menu">
        <span className="header__menu-line" />
        <span className="header__menu-line" />
        <span className="header__menu-line" />
      </div>
    </header>
  );
}
