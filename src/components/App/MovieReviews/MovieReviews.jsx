import { useParams } from "react-router-dom";
import { getReviews } from "../../../api";
import { useEffect, useState } from "react";
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReview() {
      const data = await getReviews(movieId);
      setReviews(data);
    }

    getReview();
  }, [movieId]);

  return (
    <div className={styles.reviewsContainer}>
      {reviews.length === 0 ? (
        <p className={styles.noReviewsMessage}>
          Sorry, there are no reviews of this film
        </p>
      ) : (
        <ul className={styles.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <h2 className={styles.author}>Author: {review.author}</h2>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
