import MovieCard from "../movieCard/MovieCard";
import "./MovieGrid.css";

export default function MovieGrid({ movies, wishList, onWishToggle }) {
  return (
    <div className="movie-grid">
      {/* 영화 배열을 순회하며 카드 생성 */}
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isWished={wishList.some((w) => w.id === movie.id)}
          onWishToggle={onWishToggle}
        />
      ))}
    </div>
  );
}
