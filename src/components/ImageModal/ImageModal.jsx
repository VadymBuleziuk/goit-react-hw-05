import { useEffect } from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      overlayClassName={css.overlay}
      className={css.modal}
    >
      <div className={css.modalContent}>
        <img className={css.img} src={images[currentIndex]} alt="Large View" />

        <button className={`${css.arrow} ${css.arrowLeft}`} onClick={onPrev}>
          &lt;
        </button>

        <button className={`${css.arrow} ${css.arrowRight}`} onClick={onNext}>
          &gt;
        </button>
      </div>
    </Modal>
  );
}
