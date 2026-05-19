const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

// TMDB 응답 데이터를 MovieCard에서 사용하는 형식으로 변환
export const formatMovie = (movie, genres = []) => {
  const genreName =
    genres.find((g) => g.id === movie.genre_ids?.[0])?.name ?? "기타";

  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    releaseDate: movie.release_date,
    rating: Math.round(movie.vote_average * 10) / 10,
    thumbnail: movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : null,
    genre: genreName,
  };
};
