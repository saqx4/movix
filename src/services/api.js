import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '3308647fabe47a844ab269e6eab19132';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await api.get('/trending/movie/week');
  return response.data;
};

export const fetchTopRatedMovies = async () => {
  const response = await api.get('/movie/top_rated');
  return response.data;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const fetchSimilarMovies = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/similar`);
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await api.get('/search/movie', {
    params: {
      query,
    },
  });
  return response.data;
}; 