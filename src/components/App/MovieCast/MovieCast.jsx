import { useParams } from "react-router-dom";
import { getCast } from "../../../api";
import { useEffect, useState } from "react";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function getCasts() {
      const data = await getCast(movieId);
      setCast(data);
    }

    getCasts();
  }, [movieId]);

  return (
    <div className={styles.movieCastContainer}>
      {cast.length === 0 ? (
        <p className={styles.noActorInfo}>
          There is no information about this film
        </p>
      ) : (
        <ul className={styles.actorList}>
          {cast.map((actor) => (
            <li key={actor.id} className={styles.actorCard}>
              <img
                className={styles.actorCardImage}
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
              />
              <h3 className={styles.actorCardTitle}>{actor.name}</h3>
              <p className={styles.actorCardDescription}>
                Character: {actor.character}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
