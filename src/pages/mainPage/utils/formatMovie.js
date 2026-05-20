// TMDB API 응답 형식을 사용하고자하는 형식으로 변환
// title -> title
// overview -> description
// release_date ->  releaseDate
// vote_average -> rating
// poster_path -> thumbnail
// genre_ids[0] -> genr (이름으로 변환)
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export const formatMovie = (movie, genres = []) => {
  const genreName =
    genres.find((g) => g.id === movie.genre_ids?.[0])?.name ?? "기타";

  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    releaseDate: movie.release_date,
    // vote_average는 소수점 2자리 표시
    rating: Math.round(movie.vote_average * 100) / 100,
    thumbnail: movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : null,
    genre: genreName,
  };
};
