import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useNavigate } from "react-router-dom";
import styles from "./Carousel.template.module.scss";
import DummyImage from "../../../assets/images/dummy.png";

const CarouselTemplate: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: false,
    watchDrag: false,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const slides = [
    <img loading="lazy" src={DummyImage} alt="dummy-image-1" />,
    <img loading="lazy" src={DummyImage} alt="dummy-image-2" />,
    <img loading="lazy" src={DummyImage} alt="dummy-image-3" />,
    <img loading="lazy" src={DummyImage} alt="dummy-image-4" />,
  ];

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const handleButtonClick = () => {
    if (currentIndex < slides.length - 1) {
      scrollNext();
    } else {
      // トップページに遷移
      navigate("/");
    }
  };

  const handleSkipButtonClick = () => {
    if (!emblaApi) return;
    emblaApi.scrollTo(slides.length - 1);
  };

  return (
    <div className={styles["carousel-container"]}>
      <p className={styles["title"]}>
        説明テキストダミーダミーダミーダミーダミー
      </p>
      <div className={styles["embla"]} ref={emblaRef}>
        <div className={styles["embla__container"]}>
          {slides.map((slide, index) => (
            <div className={styles["embla__slide"]} key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div className={styles["embla__dots"]}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`${styles["embla__dot"]} ${currentIndex === index ? styles["is-active"] : ""}`}
          />
        ))}
      </div>
      {currentIndex < slides.length - 1 ? (
        <>
          <button className={styles["next-button"]} onClick={handleButtonClick}>
            次へ
          </button>
          <button
            className={styles["skip-button"]}
            onClick={handleSkipButtonClick}
          >
            スキップ
          </button>
        </>
      ) : (
        <button className={styles["start-button"]} onClick={handleButtonClick}>
          はじめる
        </button>
      )}
      <p className={styles["annotation"]}>
        説明テキストダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー
      </p>
    </div>
  );
};

export default CarouselTemplate;
