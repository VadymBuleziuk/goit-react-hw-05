import css from "./ImageCard.module.css";

export default function ImageCard({ src, alt, onClick }) {
  return (
    <div onClick={onClick}>
      <img className={css.image} src={src} alt={alt} />
    </div>
  );
}
