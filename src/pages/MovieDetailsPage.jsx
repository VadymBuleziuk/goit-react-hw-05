import { Suspense, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router";
import { fetchFilmById } from "../api";
import MovieInfo from "../components/App/MovieInfo/MovieInfo";
import { useRef } from "react";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state);

  useEffect(() => {
    async function getFilm() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchFilmById(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getFilm();
  }, [movieId]);
  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>

      {isLoading && <b>Loading...</b>}
      {error && <b>Error...</b>}
      {movie && <MovieInfo movie={movie} />}
      <h4>Additional information</h4>

      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>

      <Suspense fallback={<div>Loading casts or reviews</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
