import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

// 토큰 방식으로 변경
const tmdbClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: "application/json",
  },
  params: {
    language: "ko-KR",
  },
});

export const fetchPopularMovies = async () => {
  const response = await tmdbClient.get("/movie/popular");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await tmdbClient.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};

export const fetchGenres = async () => {
  const response = await tmdbClient.get("/genre/movie/list");
  return response.data.genres;
};

export const fetchMoviesByGenre = async (
  genreId,
  sortBy = "popularity.desc",
) => {
  const response = await tmdbClient.get("/discover/movie", {
    params: {
      with_genres: genreId,
      sort_by: sortBy,
    },
  });
  return response.data.results;
};

export const convertSortOption = (selectedSort) => {
  if (selectedSort === "별점 높은순") return "vote_average.desc";
  if (selectedSort === "별점 낮은순") return "vote_average.asc";
  if (selectedSort === "최신순") return "release_date.desc";
  if (selectedSort === "오래된순") return "release_date.asc";
  return "popularity.desc";
};
