import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <div className={styles.movieListContainer}>
      <h2 className={styles.movieListTitle}>Trending today</h2>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movieListItem}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={styles.movieListItemLink}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
