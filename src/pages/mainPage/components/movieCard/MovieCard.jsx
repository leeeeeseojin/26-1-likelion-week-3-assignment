import WishButton from "../../../../components/wishButton/WishButton";
import { thumbnailPlaceholder } from "../../../../assets/icon/icons";
import "./MovieCard.css";

export default function MovieCard({ movie, isWished, onWishToggle }) {
  return (
    <div className="movie-card">
      <div className="movie-card__info">
        <div className="movie-card__title-row">
          <span className="movie-card__title">{movie.title}</span>
          <span className="movie-card__rating">⭐ {movie.rating}</span>
        </div>
        <p className="movie-card__description">{movie.description}</p>
        <div className="movie-card__bottom">
          <span className="movie-card__release">개봉: {movie.releaseDate}</span>
          <WishButton isWished={isWished} onClick={() => onWishToggle(movie)} />
        </div>
      </div>
      <img
        className="movie-card__thumbnail"
        src={movie.thumbnail ?? thumbnailPlaceholder}
        alt={movie.title}
      />
    </div>
  );
}
