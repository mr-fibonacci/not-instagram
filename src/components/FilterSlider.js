import React from "react";
import Image from "react-bootstrap/Image";
import { Swiper, SwiperSlide } from "swiper/react";
import { IMAGE_FILTERS } from "../utils";
import styles from "./FilterSlider.module.css";
import "swiper/swiper.min.css";

const FilterSlider = ({ image, image_filter, handleClick }) => {
  return (
    <>
      <p>Current filter: #{image_filter}</p>
      <p>Swipe to choose a filter.</p>
      <Swiper
        className={styles.FilterSlider}
        slidesPerView={3}
        spaceBetween={10}
        freeMode={true}
      >
        {image &&
          IMAGE_FILTERS.map((imageFilter) => (
            <SwiperSlide key={imageFilter.value}>
              <div>
                <figure
                  onClick={() => handleClick(imageFilter.value)}
                  className={imageFilter.value}
                >
                  <Image style={{ width: "100%" }} src={image} />
                </figure>
                #{imageFilter.value}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default FilterSlider;
