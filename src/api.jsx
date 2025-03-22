import axios from "axios";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzY4N2FlOWQwY2E1NmIzNGVhYmVmYzRkOWIwOTg1YiIsIm5iZiI6MTc0MjYzODMzMi40NzYsInN1YiI6IjY3ZGU4Y2ZjMjk5MjM3ODQ5MzdhYTIxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A7fy_qGGQVrOEBiOQi-jsCjwwWLosXca5nuoaL7-DCk",
  },
};
export const fetchPopularFilms = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day",
    options
  );
  return response.data.results;
};

export const fetchFilmById = async (filmID) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${filmID}`,
    options
  );
  return response.data;
};

export const fetchQueryFilms = async (query) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    options
  );
  return response.data.results;
};

export const getCast = async (filmID) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${filmID}/credits`,
    options
  );
  return response.data.cast;
};
export const getReviews = async (filmID) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${filmID}/reviews`,
    options
  );
  return response.data.results;
};
