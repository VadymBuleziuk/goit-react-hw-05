import { useEffect, useState } from "react";
import { fetchPopularFilms } from "../api";
import MovieList from "../components/App/MovieList/MovieList";

export default function HomePage() {
  const [popularFilms, setPopularFilms] = useState([]);
  useEffect(() => {
    async function getPopularFilms() {
      try {
        const newPopularFilms = await fetchPopularFilms();
        setPopularFilms(newPopularFilms);
      } catch (error) {
        console.log(error);
      }
    }
    getPopularFilms();
  }, []);

  return <MovieList movies={popularFilms} />;
}
