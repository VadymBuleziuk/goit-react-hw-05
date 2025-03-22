import styles from "./MovieInfo.module.css";

export default function MovieInfo({ movie }) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className={styles.textContent}>
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.userScore}>User score: {movie.vote_average}</p>
        <h3>Overview</h3>
        <p className={styles.overview}>{movie.overview}</p>
        <h3>Genres</h3>
        <ul className={styles.genreList}>
          {movie.genres &&
            movie.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
