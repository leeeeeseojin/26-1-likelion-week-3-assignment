// api 함수 모음
import axios from "axios";

// .env에서 환경변수 가져옴
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

// axios 인스턴스 생성
const tmdbClient = axios.create({
  baseURL: BASE_URL, // 모든 요청 앞에 자동으로 붙는 주소
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: "application/json",
  },
  params: {
    language: "ko-KR", // 모든 요청에 자동으로 붙는 파라미터로 한국어 응답 요청
  },
});

// 인기 영화 목록 조회
// GET /movie/popular
export const fetchPopularMovies = async () => {
  const response = await tmdbClient.get("/movie/popular");
  return response.data.results; // results 배열 안에 영화 목록
};

// 영화 검색
// GET /search/movie?query=검색어
export const searchMovies = async (query) => {
  const response = await tmdbClient.get("/search/movie", {
    params: { query }, // 검색어를 파라미터로 전달
  });
  return response.data.results;
};

// 장르 목록 조회
// GET /genre/movie/list
export const fetchGenres = async () => {
  const response = await tmdbClient.get("/genre/movie/list");
  return response.data.genres; // genres 배열 안에 장르 목록
};

// 장르별 영화 목록 조회
export const fetchMoviesByGenre = async (
  genreId,
  sortBy = "popularity.desc",
) => {
  const response = await tmdbClient.get("/discover/movie", {
    params: {
      with_genres: genreId, // 장르 ID로 필터링
      sort_by: sortBy, // 정렬 기준
    },
  });
  return response.data.results;
};

// 화면 정렬 옵션 → TMDB sort_by 파라미터로 변환
export const convertSortOption = (selectedSort) => {
  if (selectedSort === "별점 높은순") return "vote_average.desc";
  if (selectedSort === "별점 낮은순") return "vote_average.asc";
  if (selectedSort === "최신순") return "release_date.desc";
  if (selectedSort === "오래된순") return "release_date.asc";
  return "popularity.desc"; // 기본순
};
