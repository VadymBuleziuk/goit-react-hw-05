import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ result, openModal }) {
  return (
    <ul className={css.cardList}>
      {result.map((image, index) => {
        return (
          <li className={css.card} key={image.id}>
            <ImageCard
              src={image.urls.raw}
              alt={image.description}
              onClick={() => openModal(index)}
            />
          </li>
        );
      })}
    </ul>
  );
}
