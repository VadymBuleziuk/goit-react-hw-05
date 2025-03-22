import { useState, useEffect } from "react";
import searchImages from "../../api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const loadMore = () => {
    setPage(page + 1);
  };

  const submitForm = (input) => {
    setResponse([]);
    setSearchTerm(input);
    setPage(1);
  };

  useEffect(() => {
    if (searchTerm === "") {
      return;
    }
    async function getData() {
      try {
        setErrorMessage(false);
        setLoading(true);
        const results = await searchImages(searchTerm, page);
        setResponse((prevResults) => {
          return [...prevResults, ...results];
        });
        setLoading(false);
      } catch {
        setErrorMessage(true);
        setLoading(false);
      }
    }
    getData();
  }, [searchTerm, page]);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(0);
  };

  const goToPrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? response.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === response.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <SearchBar onSubmit={submitForm} />
      {errorMessage && <ErrorMessage />}
      {response.length > 0 && (
        <ImageGallery result={response} openModal={openModal} />
      )}
      {loading && <Loader />}
      {response.length > 0 && <LoadMoreButton load={loadMore} />}
      <ImageModal
        isOpen={isModalOpen}
        images={response.map((image) => image.urls.full)}
        currentIndex={selectedImageIndex}
        onClose={closeModal}
        onPrev={goToPrevImage}
        onNext={goToNextImage}
      />
    </div>
  );
}
