import { useState, useEffect, useMemo } from "react";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import FilterBar from "../components/filterBar/FilterBar";
import MovieGrid from "../components/movieGrid/MovieGrid";
import WishListPanel from "../components/wishListPanel/WishListPanel";
import {
  fetchPopularMovies,
  fetchGenres,
  fetchMoviesByGenre,
  searchMovies,
  convertSortOption,
} from "../../../apis/movieApi";
import { formatMovie } from "../utils/formatMovie";
import "./MainPage.css";

export default function MainPage() {
  const [movies, setMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("전체");
  const [selectedSort, setSelectedSort] = useState("기본순");
  const [wishList, setWishList] = useState([]);

  // 장르 목록은 한 번만 불러오면 되므로 의존성 배열을 []로 설정
  useEffect(() => {
    const loadGenres = async () => {
      const genres = await fetchGenres();
      setGenreList(genres);
    };
    loadGenres();
  }, []);

  // 검색어/장르/정렬이 바뀔 때마다 영화 목록을 다시 불러옴
  useEffect(() => {
    const loadMovies = async () => {
      let rawMovies;

      // 검색어 > 장르 > 기본 순서로 우선순위 적용
      if (searchQuery) {
        rawMovies = await searchMovies(searchQuery);
      } else if (selectedGenre !== "전체") {
        const genreId = genreList.find((g) => g.name === selectedGenre)?.id;
        const sortBy = convertSortOption(selectedSort);
        rawMovies = await fetchMoviesByGenre(genreId, sortBy);
      } else {
        rawMovies = await fetchPopularMovies();
      }

      // TMDB 응답 형식을 컴포넌트에서 사용하는 형식으로 변환
      const formatted = rawMovies.map((movie) => formatMovie(movie, genreList));
      setMovies(formatted);
    };

    // genreList가 준비된 후에만 실행
    if (genreList.length > 0 || searchQuery) {
      loadMovies();
    }
  }, [searchQuery, selectedGenre, selectedSort, genreList]);

  // 검색 API는 sort_by를 지원하지 않으므로 검색 중일 때만 프론트에서 정렬
  const displayedMovies = useMemo(() => {
    if (!searchQuery) return movies;

    const sorted = [...movies];

    if (selectedSort === "별점 높은순") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === "별점 낮은순") {
      sorted.sort((a, b) => a.rating - b.rating);
    } else if (selectedSort === "최신순") {
      sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else if (selectedSort === "오래된순") {
      sorted.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }

    return sorted;
  }, [movies, searchQuery, selectedSort]);

  // 단순 값 선택( -> 삼항연산자 사용
  const handleWishToggle = (movie) => {
    setWishList((prev) => {
      const isWished = prev.some((w) => w.id === movie.id);
      return isWished
        ? prev.filter((w) => w.id !== movie.id)
        : [...prev, movie];
    });
  };

  const genreOptions = ["전체", ...genreList.map((g) => g.name)];

  return (
    <div className="main-page">
      <Header onSearch={setSearchQuery} />
      <FilterBar
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        genres={genreOptions}
      />
      <div className="main-page__body">
        <MovieGrid
          movies={displayedMovies}
          wishList={wishList}
          onWishToggle={handleWishToggle}
        />
        <WishListPanel wishList={wishList} />
      </div>
      <Footer />
    </div>
  );
}
