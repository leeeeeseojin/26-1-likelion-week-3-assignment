import { useState, useMemo } from "react";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import FilterBar from "../components/filterBar/FilterBar";
import MovieGrid from "../components/movieGrid/MovieGrid";
import WishListPanel from "../components/wishListPanel/WishListPanel";
import { movies } from "../utils/MainPageDummy";
import "./MainPage.css";

export default function MainPage() {
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState("");

  // 선택된 장르 상태
  const [selectedGenre, setSelectedGenre] = useState("전체");

  // 선택된 정렬 상태
  const [selectedSort, setSelectedSort] = useState("기본순");

  // 위시리스트 상태
  const [wishList, setWishList] = useState([]);

  // 위시 버튼 클릭 시 추가/제거
  const handleWishToggle = (movie) => {
    setWishList((prev) => {
      const isWished = prev.some((w) => w.id === movie.id);
      if (isWished) {
        // 이미 있으면 제거
        return prev.filter((w) => w.id !== movie.id);
      }
      // 없으면 추가
      return [...prev, movie];
    });
  };

  // 검색, 장르, 정렬 필터링
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // 검색어 필터
    if (searchQuery) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ); // 문자열을 소문자로 바꿔서 찾을 수 있게 함
    }

    // 장르 필터
    if (selectedGenre !== "전체") {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    // 정렬
    switch (selectedSort) {
      // 결과가 음수면 a가 앞으로, 결과가 양수면 b가 앞으로
      case "별점 높은순":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "별점 낮은순":
        result.sort((a, b) => a.rating - b.rating);
        break;
      case "최신순":
        result.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
        );
        break;
      case "오래된순":
        result.sort(
          (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate),
        );
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedGenre, selectedSort]);

  return (
    <div className="main-page">
      <Header onSearch={setSearchQuery} />
      <FilterBar
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />
      <div className="main-page__body">
        <MovieGrid
          movies={filteredMovies}
          wishList={wishList}
          onWishToggle={handleWishToggle}
        />
        <WishListPanel wishList={wishList} />
      </div>
      <Footer />
    </div>
  );
}
