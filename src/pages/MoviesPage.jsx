import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";
import { fetchQueryFilms } from "../api";
import MovieList from "../components/App/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [debouncedQuery] = useDebounce(query, 300);

  const changeSearchText = (event) => {
    const nextParams = new URLSearchParams(searchParams);

    if (event.target.value !== "") {
      nextParams.set("query", event.target.value);
    } else {
      nextParams.delete("query");
    }

    setSearchParams(nextParams);
  };

  useEffect(() => {
    async function getFilms() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchQueryFilms(debouncedQuery);
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getFilms();
  }, [debouncedQuery]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={changeSearchText}
        placeholder="Search for movies..."
        className={styles.searchInput}
      />
      {isLoading && <b>Loading films...</b>}
      {error && <b>Whoops, there was an error. Please reload the page...</b>}
      {movies.length === 0 ? (
        <p> There are no films you are search</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </>
  );
}
